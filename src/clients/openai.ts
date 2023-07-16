import type {
  ChatCompletionRequestMessage,
  CreateChatCompletionRequest,
  CreateChatCompletionResponse,
} from "openai";
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";

import { OPENAI_API_KEY } from "../config.ts";

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openAI = new OpenAIApi(configuration);

export function buildChatCompletionMessages(
  messages: string[]
): ChatCompletionRequestMessage[] {
  return [
    { role: ChatCompletionRequestMessageRoleEnum.System, content: messages[0] },
    ...messages.slice(1).map((message, index) => ({
      role:
        index % 2 === 0
          ? ChatCompletionRequestMessageRoleEnum.User
          : ChatCompletionRequestMessageRoleEnum.Assistant,
      content: message,
    })),
  ];
}

export async function createChatCompletion({
  model,
  messages,
}: CreateChatCompletionRequest): Promise<CreateChatCompletionResponse> {
  try {
    const { data } = await openAI.createChatCompletion({
      model,
      messages,
    });
    return data;
  } catch (err) {
    // TODO: Proper error handling.
    if (err.response) {
      console.error(err.response.status, err.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${err.message}`);
    }

    throw err;
  }
}
