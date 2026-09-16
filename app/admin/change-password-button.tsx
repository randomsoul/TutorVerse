'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function ChangePasswordButton({ profileId, role, name }: { profileId: string; role: 'student'|'parent'|'manager'|'tutor'; name?: string|null }) {
  const [busy,setBusy]=useState(false);
  async function changePassword(){
    const label=name||role;
    if(!window.confirm(`Change the password for ${label}?`)) return;
    const password=window.prompt('Enter the new password (minimum 8 characters):');
    if(password===null) return;
    if(password.length<8){alert('Password must be at least 8 characters.');return;}
    const confirmPassword=window.prompt('Re-enter the new password to confirm:');
    if(confirmPassword===null) return;
    if(password!==confirmPassword){alert('Passwords do not match.');return;}
    setBusy(true);
    const {data,error}=await supabase.functions.invoke('admin-manage-people',{body:{action:'change-password',role,profile_id:profileId,new_password:password}});
    setBusy(false);
    alert(error?.message||data?.error||data?.message||'Password change failed.');
  }
  return <button disabled={busy} onClick={changePassword} className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 disabled:opacity-50">{busy?'Changing…':'Change password'}</button>;
}
