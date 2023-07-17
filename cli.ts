#!/usr/bin/env -S deno run --allow-env --allow-net --allow-read

import Ask from "ask";

import { OPENAI_API_KEY } from "/config.ts";
import { Chat } from "~/models/Chat.ts";

async function main() {
  console.log("Welcome to ChatGPT!");

  if (!OPENAI_API_KEY) {
    throw new Error(
      "An OpenAI API key is required. Please see README.md for instructions."
    );
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
      continue;
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
