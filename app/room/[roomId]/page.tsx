import { db } from "@/db";
import { messages } from "@/db/schema";
import { eq } from "drizzle-orm";

import MessageField from "@/components/MessageField";
import Messages from "@/components/Messages";

interface PageProps {
  params: {
    roomId: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { roomId } = params;

  // Existing messages are retrieved from the database
  const serializedMessages = await db
    .select({ text: messages.text, id: messages.id })
    .from(messages)
    .where(eq(messages.chatRoomId, roomId));

  return (
    <div>
      <p>messages:</p>

      <Messages roomId={roomId} initialMessages={serializedMessages} />
      <MessageField roomId={roomId} />
    </div>
  );
};

export default page;
