import { load } from "dotenv";

const env = await load();

export const OPENAI_API_KEY = env["OPENAI_API_KEY"];
