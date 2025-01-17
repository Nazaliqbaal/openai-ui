"use server";

import { ChatCompletionMessage } from "./chat-completion-messages.interface";

export default async function createChatCompletion(
  messages: ChatCompletionMessage[]
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/openai/chatCompletion`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ messages }),
    }
  );
  return response.json();
}
