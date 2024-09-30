"use client";

import { useRouter } from "next/navigation";

const Page = () => {
  let roomIdInput = "";
  const router = useRouter();

  const createRoom = async () => {
    // We will talk about api route shortly
    const res = await fetch("/api/rooms/create");

    const roomId: string = await res.text();
    router.push(`/room/${roomId}`);
  };

  const joinRoom = async (roomId: string) => {
    console.log(roomIdInput, roomId);
    router.push(`/room/${roomId}`);
  };

  return (
    <div>
      <button onClick={createRoom}>Create room</button>
      <div className="flex gap-2">
        <input onChange={({ target }) => (roomIdInput = target.value)} />

        <button onClick={() => joinRoom(roomIdInput)}>Join room</button>
      </div>
    </div>
  );
};

export default Page;
