import { load } from "https://deno.land/std@0.194.0/dotenv/mod.ts";

const env = await load();

export const OPENAI_API_KEY =
  Deno.env.get("OPENAI_API_KEY") ?? env["OPENAI_API_KEY"];

export const OPENAI_BASE_URL = "https://api.openai.com/v1";
