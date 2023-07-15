import { OPENAI_API_KEY, OPENAI_BASE_URL } from "./config.ts";

const res = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Say this is a test!" }],
    temperature: 0.7,
  }),
});
const body = await res.json();
console.log(body);
