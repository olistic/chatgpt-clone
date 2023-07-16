#!/usr/bin/env -S deno run --allow-env --allow-net --allow-read

import Ask from "ask";

import { Chat } from "./src/models/Chat.ts";
import { OPENAI_API_KEY } from "./src/config.ts";

async function main() {
  console.log("Welcome to ChatGPT!");

  if (!OPENAI_API_KEY) {
    throw new Error("No OpenAI API key provided.");
  }

  const chat = new Chat();

  const ask = new Ask({
    prefix: "",
  });

  while (true) {
    const { prompt } = await ask.input({
      name: "prompt",
      message: ">",
    });

    if (!prompt) {
      throw new Error("No prompt provided.");
    }

    const response = await chat.sendMessage(prompt);

    console.log(response);
  }
}

if (import.meta.main) {
  try {
    await main();
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }

    Deno.exit(1);
  }
}
