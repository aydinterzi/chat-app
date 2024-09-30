import { db } from "@/db";
import { chatRoom } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function GET() {
  const id = nanoid();

  // TL;DR: We create a chat room with a random id, then
  // return the room id to the client side.
  await db.insert(chatRoom).values({
    id,
  });
  const [room] = await db
    .select({ id: chatRoom.id })
    .from(chatRoom)
    .where(eq(chatRoom.id, id));

  return new Response(room.id);
}
