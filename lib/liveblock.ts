import { Liveblocks } from "@liveblocks/node";

const key = process.env.NEXT_LIVEBLOCKS_PRIVATE_KEY;

if (!key) {
  throw new Error("NEXT_LIVEBLOCKS_PRIVATE_KEY is not set!");
}

const liveblocks = new Liveblocks({
  secret: key,
});

export default liveblocks;
