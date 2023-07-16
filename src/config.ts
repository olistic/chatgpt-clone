import { load } from "dotenv";

const env = await load();

export const OPENAI_API_KEY =
  Deno.env.get("OPENAI_API_KEY") ?? env["OPENAI_API_KEY"];

export const OPENAI_BASE_URL = "https://api.openai.com/v1";
