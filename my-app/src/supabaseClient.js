import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://qiazitxeswmdypzdmntt.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpYXppdHhlc3dtZHlwemRtbnR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzOTUxMDYsImV4cCI6MjA2Nzk3MTEwNn0.zcgOyMTe47_YAWmGWqlgGvb7tJYAb5m1ZZXaF1mKmWY"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
