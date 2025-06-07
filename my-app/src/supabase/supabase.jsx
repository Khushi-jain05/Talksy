// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://icvklrslgbchqtayrowh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljdmtscnNsZ2JjaHF0YXlyb3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyOTI5MzMsImV4cCI6MjA2NDg2ODkzM30.PR-3rz92Rk51ggyMwBdiBj9r3jgqpHUo1Y0TWPvqU9A'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
