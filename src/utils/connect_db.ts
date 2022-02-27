import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config();

const URL = process.env.SUPABASE_URL_API as string;
const KEY = process.env.SUPABASE_ANON_KEY as string;

const supabase = createClient(URL, KEY);

export { supabase };
