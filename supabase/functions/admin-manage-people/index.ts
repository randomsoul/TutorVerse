import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS" };
const roleTables: Record<string, string> = { student: "students", parent: "parents", tutor: "tutors" };
const roleModules: Record<string, string> = { student: "Students", parent: "Parents", tutor: "Tutors" };
function json(body: unknown, status = 200) { return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } }); }
function clean(value: unknown, max = 5000) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }
function arr(value: unknown) { return Array.isArray(value) ? value.filter((x): x is string => typeof x === "string").map(x => x.trim()).filter(Boolean).slice(0, 100) : []; }

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  const supabaseUrl = Deno.env.get("SUPABASE_URL"), serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"), anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!supabaseUrl || !serviceRole || !anonKey) return json({ error: "Server configuration error" }, 500);
  const authHeader = req.headers.get("Authorization"); if (!authHeader) return json({ error: "Authorization required" }, 401);
  const userClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } });
  const adminClient = createClient(supabaseUrl, serviceRole);
  const { data: { user: caller }, error: callerError } = await userClient.auth.getUser();
  if (callerError || !caller) return json({ error: "Invalid session" }, 401);
  const { data: callerProfile } = await adminClient.from("profiles").select("role").eq("id", caller.id).maybeSingle();
  const callerRole = callerProfile?.role as string | undefined;
  if (!["admin", "manager", "staff"].includes(callerRole || "")) return json({ error: "Not authorised" }, 403);
  let body: any; try { body = await req.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
  const action = clean(body.action, 30), role = clean(body.role, 30), profileId = clean(body.profile_id, 80);
  if (!["student", "parent", "tutor", "manager"].includes(role)) return json({ error: "Unsupported role" }, 400);

  if (action === "change-password") {
    if (callerRole !== "admin") return json({ error: "Only the Main Admin can change account passwords." }, 403);
    if (!profileId) return json({ error: "profile_id is required" }, 400);
    if (caller.id === profileId) return json({ error: "You cannot change your own password here." }, 400);
    const newPassword = typeof body.new_password === "string" ? body.new_password : "";
    if (newPassword.length < 8) return json({ error: "Password must be at least 8 characters." }, 400);
    const { data: target, error: targetError } = await adminClient.from("profiles").select("id,role,full_name").eq("id", profileId).maybeSingle();
    if (targetError || !target) return json({ error: "Account not found" }, 404);
    if (target.role !== role) return json({ error: "Role does not match this account" }, 400);
    const { error } = await adminClient.auth.admin.updateUserById(profileId, { password: newPassword });
    if (error) return json({ error: error.message }, 400);
    return json({ ok: true, message: `Password changed for ${target.full_name || role} successfully.` });
  }
  if (!["student", "parent", "tutor"].includes(role)) return json({ error: "Unsupported role" }, 400);
  const table = roleTables[role], moduleName = roleModules[role];

  if (action === "list") {
    if (callerRole !== "admin") {
      const { data: permission } = await adminClient.from("manager_permissions").select("can_view").eq("manager_id", caller.id).eq("module", moduleName).maybeSingle();
      if (!permission?.can_view) return json({ error: "You do not have View permission for this module." }, 403);
    }
    const { data: rows, error: rowsError } = await adminClient.from(table).select("*").order("created_at", { ascending: false });
    if (rowsError) return json({ error: rowsError.message }, 400);
    const records = [];
    for (const row of rows || []) {
      const pid = row.profile_id; let profile = null, email = null;
      if (pid) {
        const { data: p } = await adminClient.from("profiles").select("id,full_name,role,phone,whatsapp_opt_in,created_at,is_active,archived_at").eq("id", pid).maybeSingle();
        profile = p || null; const { data: authData } = await adminClient.auth.admin.getUserById(pid); email = authData.user?.email || null;
      }
      records.push({ ...row, profile, email });
    }
    return json({ records });
  }

  if (!profileId) return json({ error: "profile_id is required" }, 400);
  if (caller.id === profileId) return json({ error: "You cannot modify your own account here." }, 400);
  const { data: target, error: targetError } = await adminClient.from("profiles").select("id,role,full_name,is_active,archived_at").eq("id", profileId).maybeSingle();
  if (targetError || !target) return json({ error: "Account not found" }, 404);
  if (target.role !== role) return json({ error: "Role does not match this account" }, 400);

  if (action === "edit" && role === "tutor") {
    if (callerRole !== "admin") {
      const { data: permission } = await adminClient.from("manager_permissions").select("can_edit").eq("manager_id", caller.id).eq("module", moduleName).maybeSingle();
      if (!permission?.can_edit) return json({ error: "You do not have Edit permission for this module." }, 403);
    }
    const tutor = body.tutor || {};
    const profileUpdate: Record<string, unknown> = {};
    if (typeof tutor.full_name === "string") profileUpdate.full_name = clean(tutor.full_name, 200);
    if (typeof tutor.phone === "string") profileUpdate.phone = clean(tutor.phone, 50) || null;
    if (typeof tutor.email === "string" && callerRole === "admin") {
      const email = clean(tutor.email, 320); if (email) { const { error } = await adminClient.auth.admin.updateUserById(profileId, { email }); if (error) return json({ error: error.message }, 400); }
    }
    if (Object.keys(profileUpdate).length) { const { error } = await adminClient.from("profiles").update(profileUpdate).eq("id", profileId); if (error) return json({ error: error.message }, 400); }
    const update: Record<string, unknown> = {
      experience_years: tutor.experience_years === "" || tutor.experience_years == null ? null : Number(tutor.experience_years),
      bio: clean(tutor.bio, 10000) || null, city: clean(tutor.city, 200) || null, area: clean(tutor.area, 200) || null,
      address_line: clean(tutor.address_line, 500) || null, state: clean(tutor.state, 100) || null, pincode: clean(tutor.pincode, 20) || null,
      latitude: tutor.latitude === "" || tutor.latitude == null ? null : Number(tutor.latitude), longitude: tutor.longitude === "" || tutor.longitude == null ? null : Number(tutor.longitude),
      location_accuracy_m: tutor.location_accuracy_m === "" || tutor.location_accuracy_m == null ? null : Number(tutor.location_accuracy_m),
      max_travel_km: tutor.max_travel_km === "" || tutor.max_travel_km == null ? null : Number(tutor.max_travel_km),
      availability: clean(tutor.availability, 500) || null, grades: arr(tutor.grades), boards: arr(tutor.boards), subjects: arr(tutor.subjects), custom_subjects: arr(tutor.custom_subjects), modes: arr(tutor.modes),
    };
    if (typeof tutor.approved === "boolean") update.approved = tutor.approved;
    const { error } = await adminClient.from("tutors").update(update).eq("profile_id", profileId);
    if (error) return json({ error: error.message }, 400);
    return json({ ok: true, message: "Tutor profile saved." });
  }

  if (action === "delete") {
    if (callerRole !== "admin") return json({ error: "Only the Main Admin can permanently delete accounts." }, 403);
    const { error: roleDeleteError } = await adminClient.from(table).delete().eq("profile_id", profileId);
    if (roleDeleteError) return json({ error: `This ${role} cannot be permanently deleted because related records still depend on it. Details: ${roleDeleteError.message}` }, 409);
    const { error: authDeleteError } = await adminClient.auth.admin.deleteUser(profileId);
    if (authDeleteError) return json({ error: `The ${role} record was removed, but the login account could not be deleted. Please retry. Details: ${authDeleteError.message}` }, 500);
    return json({ ok: true, message: `${role[0].toUpperCase()}${role.slice(1)} permanently deleted.` });
  }
  if (action === "archive" || action === "deactivate") {
    if (callerRole === "manager") {
      const column = action === "archive" ? "can_archive" : "can_deactivate";
      const { data: permission } = await adminClient.from("manager_permissions").select(column).eq("manager_id", caller.id).eq("module", moduleName).maybeSingle();
      if (!permission?.[column]) return json({ error: `You do not have ${action} permission for this module.` }, 403);
    } else if (callerRole !== "admin") return json({ error: "Only Admin or an authorised Manager can archive/deactivate accounts." }, 403);
    const update = action === "archive" ? { archived_at: new Date().toISOString() } : { is_active: false };
    const { error: updateError } = await adminClient.from("profiles").update(update).eq("id", profileId);
    if (updateError) return json({ error: updateError.message }, 400);
    return json({ ok: true, message: `${role[0].toUpperCase()}${role.slice(1)} ${action}d.` });
  }
  return json({ error: "Unsupported action" }, 400);
});
