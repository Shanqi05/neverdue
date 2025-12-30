import { createClient } from '@supabase/supabase-js'

// TODO: Replace these with your Supabase project credentials
// Find these at: https://app.supabase.com/project/_/settings/api
const supabaseUrl = 'https://bhjpjyjdvwwvvrezrwwf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoanBqeWpkdnd3dnZyZXpyd3dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4NDEzMDMsImV4cCI6MjA4MjQxNzMwM30.t6PYTin4vrFnDeKTpTwL6Eo_XkACgRAuQmjOdCDL4es'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
