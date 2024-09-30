"use client";

interface MessageFieldProps {
  roomId: string;
}

const MessageField = ({ roomId }: MessageFieldProps) => {
  // No need for state, we just define a variable input variable
  // which changes whenever the text input changes.
  let input = "";

  const sendMessage = async (text: string) => {
    // We will talk about /api/message/route.ts shortly.
    await fetch("/api/message", {
      method: "POST",
      body: JSON.stringify({ text, roomId }),
    });
  };

  return (
    <div className="flex gap-2">
      type a new message:
      <input onChange={({ target }) => (input = target.value)} />
      <button onClick={() => sendMessage(input || "")}>send</button>
    </div>
  );
};

export default MessageField;
