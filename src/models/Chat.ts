import {
  buildChatCompletionMessages,
  createChatCompletion,
} from "~/clients/openai.ts";

const MODEL = "gpt-3.5-turbo";

const ASSISTANT_BEHAVIOR = "You are a helpful assistant.";

export interface Message {
  content: string;
  timestamp: number;
}

export class Chat {
  #messages: Message[] = [];

  async sendMessage(userMessage: string): Promise<string> {
    this.#messages.push({
      content: userMessage,
      timestamp: Date.now(),
    });

    const response = await createChatCompletion({
      model: MODEL,
      messages: buildChatCompletionMessages([
        ASSISTANT_BEHAVIOR,
        ...this.#messages.map(({ content }) => content),
      ]),
    });

    const assistantMessage = response.choices[0].message?.content;

    if (!assistantMessage) {
      throw new Error("No assistant message found.");
    }

    this.#messages.push({
      content: assistantMessage,
      timestamp: Date.now(),
    });

    return assistantMessage;
  }
}
