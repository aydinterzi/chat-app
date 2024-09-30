import { db } from "@/db";
import { messages } from "@/db/schema";
import { nanoid } from "nanoid";

import { pusherServer } from "@/lib/pusherServer";

export async function POST(req: Request) {
  const { text, roomId } = await req.json();

  // trigger a pusher event named "incoming-message" that will
  // update the state of the messages for everyone.
  pusherServer.trigger(roomId, "incoming-message", text);

  // Insert the message into the database
  await db.insert(messages).values({ id: nanoid(), text, chatRoomId: roomId });

  return new Response(JSON.stringify({ success: true }));
}
