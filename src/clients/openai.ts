import { OPENAI_API_KEY, OPENAI_BASE_URL } from "../config.ts";

type RequestEndpoint = `/${string}`;

enum RequestMethod {
  Delete = "DELETE",
  Get = "GET",
  Post = "POST",
}

type RequestInput =
  | {
      endpoint: RequestEndpoint;
      method: RequestMethod.Delete | RequestMethod.Get;
      data?: never;
    }
  | {
      endpoint: RequestEndpoint;
      method: RequestMethod.Post;
      data?: Record<string, unknown>;
    };

async function request<Response>({
  endpoint,
  method,
  data,
}: RequestInput): Promise<Response> {
  if (!OPENAI_API_KEY) {
    throw new Error("No OpenAI API key provided.");
  }

  try {
    const response = await fetch(`${OPENAI_BASE_URL}${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      ...(data && { body: JSON.stringify(data) }),
    });
    return await response.json();
  } catch (err) {
    // TODO: Proper error handling.
    if (err instanceof Error) {
      console.error(`Error with OpenAI API request: ${err.message}`);
    }

    throw err;
  }
}

export enum ChatCompletionMessageRole {
  Assistant = "assistant",
  System = "system",
  User = "user",
}

export interface ChatCompletionMessage {
  role: ChatCompletionMessageRole;
  content?: string;
}

export interface CreateChatCompletionRequest {
  model: string;
  messages: ChatCompletionMessage[];
  temperature?: number;
}

export interface CreateChatCompletionResponseChoice {
  message?: ChatCompletionMessage;
}

export interface CreateChatCompletionResponse {
  choices: CreateChatCompletionResponseChoice[];
}

export async function createChatCompletion({
  model,
  messages,
  temperature,
}: CreateChatCompletionRequest): Promise<CreateChatCompletionResponse> {
  return await request<CreateChatCompletionResponse>({
    endpoint: "/chat/completions",
    method: RequestMethod.Post,
    data: {
      model,
      messages,
      temperature,
    },
  });
}
