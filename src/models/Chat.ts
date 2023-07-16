import {
  ChatCompletionMessageRole,
  createChatCompletion,
} from "../clients/openai.ts";

const MODEL = "gpt-3.5-turbo";

const ASSISTANT_BEHAVIOR = "You are a helpful assistant.";

export interface Message {
  content: string;
  timestamp: number;
}

export class Chat {
  #conversation: Message[] = [];

  get conversation(): Message[] {
    return this.#conversation;
  }

  async sendMessage(userMessage: string): Promise<string> {
    this.#conversation.push({
      content: userMessage,
      timestamp: Date.now(),
    });

    const response = await createChatCompletion({
      model: MODEL,
      messages: this.#buildMessages(),
      temperature: 0.5,
    });

    const assistantMessage = response.choices[0].message?.content;

    if (!assistantMessage) {
      throw new Error("No assistant message found.");
    }

    this.#conversation.push({
      content: assistantMessage,
      timestamp: Date.now(),
    });

    return assistantMessage;
  }

  #buildMessages() {
    return [
      { role: ChatCompletionMessageRole.System, content: ASSISTANT_BEHAVIOR },
      ...this.#conversation.map((message, index) => ({
        role:
          index % 2 === 0
            ? ChatCompletionMessageRole.User
            : ChatCompletionMessageRole.Assistant,
        content: message.content,
      })),
    ];
  }
}
