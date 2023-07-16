#!/usr/bin/env -S deno run --allow-env --allow-net --allow-read

import Ask from "ask";

import { Chat } from "./src/models/Chat.ts";

console.log("Welcome to ChatGPT!");

const chat = new Chat();

const ask = new Ask({
  prefix: ">",
});

while (true) {
  const { prompt } = await ask.input({
    name: "prompt",
    message: "",
  });

  if (!prompt) {
    throw new Error("No prompt provided.");
  }

  const response = await chat.sendMessage(prompt);

  console.log(response);
}
