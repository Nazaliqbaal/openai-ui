"use client";

import { useState } from "react";
import createChatCompletion from "./createChatCompletion";
import { ChatCompletionMessage } from "./chat-completion-messages.interface";
import { toast } from "sonner";

export default function Home() {
  const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);

  const [message, setMessage] = useState("");

  const handleMessages = async () => {
    const updatedMessages = [
      ...messages,
      {
        role: "user",
        content: message,
      },
    ];
    setMessages(updatedMessages);
    setMessage("");
    try {
      const response = await createChatCompletion(messages);
      if (response.status === "error") {
        // Display the error message in a toast
        toast.error(response.message);
      } else {
        // Handle the successful response here
        setMessages([...updatedMessages, response.choices[0]?.message]);
      }
    } catch (err) {
      // Handle unexpected errors
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="h-screen flex justify-end items-center flex-col gap-10 mx-auto container px-3 md:px-10">
      <div className="flex-col gap-3 h-[75%] w-full  flex">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.role === "user" ? "chat chat-end" : "chat chat-start"
            }
          >
            <div className="chat-bubble">
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search for something..."
        className="input input-bordered w-full m-10 text-white"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        onKeyDown={async (event) => {
          if (event.key === "Enter") {
            await handleMessages();
          }
        }}
      />
    </div>
  );
}
