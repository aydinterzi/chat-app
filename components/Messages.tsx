"use client";

import { useEffect, useState } from "react";

import { pusherClient } from "@/lib/pusherClient";

interface MessagesProps {
  initialMessages: {
    text: string;
    id: string;
  }[];
  roomId: string;
}

const Messages = ({ initialMessages, roomId }: MessagesProps) => {
  const [incomingMessages, setIncomingMessages] = useState<string[]>([]);

  useEffect(() => {
    // subscribe the current room to listen for pusher events.
    pusherClient.subscribe(roomId);

    // when an "incoming-message" event is triggered
    // (shown in the previous code block)
    // make sure to update the messages state in real-time for all users.
    pusherClient.bind("incoming-message", (text: string) => {
      setIncomingMessages((prev) => [...prev, text]);
    });

    // unsubscribe on component unmount.
    return () => {
      pusherClient.unsubscribe(roomId);
    };
  }, []);

  return (
    <div>
      {initialMessages.map((message) => (
        <p key={message.id}>{message.text}</p>
      ))}
      {incomingMessages.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </div>
  );
};

export default Messages;
