import { relations } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

// NOTE: The semantics should hold across different ORM's such as Prisma,
// so you can use this code as a rough guide to recreate the schema using
// another ORM language.
export const chatRoom = pgTable("chatRoom", {
  id: varchar("id", { length: 255 }).primaryKey(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt"),
});

export const messages = pgTable("messages", {
  id: varchar("id", { length: 255 }).primaryKey(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt"),
  text: varchar("text", { length: 255 }).notNull(),
  chatRoomId: varchar("chatRoomId", { length: 255 }).notNull(),
});

export const chatRoomRelations = relations(chatRoom, ({ many }) => ({
  message: many(messages),
}));

export const messageRelations = relations(messages, ({ one }) => ({
  chatRoom: one(chatRoom, {
    fields: [messages.chatRoomId],
    references: [chatRoom.id],
  }),
}));
