import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://letfztzukipascnffqsm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxldGZ6dHp1a2lwYXNjbmZmcXNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3Mzg0NzIsImV4cCI6MjA1NjMxNDQ3Mn0.bJJ6NYO1w02jISkSJ_V7rJ8cJfW2V0VHTTw-4JD3Ets";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
