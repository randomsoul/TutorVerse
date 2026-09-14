import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wsqkpbxxdadycntthzma.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_bqp8vPtfwQIXUbcQ8h6c4g_AdmQQpGT'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
