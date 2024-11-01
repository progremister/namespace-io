import { motion } from "framer-motion";
import stringToColor from "@/lib/stringToColor";

function FollowPointer({
  x,
  y,
  info,
}: {
  x: number;
  y: number;
  info: {
    name: string;
    email: string;
    image: string;
  };
}) {
  const color = stringToColor(info.email || "1");

  return (
    <motion.div
      className="h-4 w-4 rounded-full absolute z-50 "
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      <svg
        stroke={color}
        fill={color}
        strokeWidth="1"
        viewBox="0 0 20 20"
        className={`h-4 w-4 text-[${color}] transform-rotate-[70deg] translate-x-[40px] translate-y-[10px] stroke-[${color}]`}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
        />
      </svg>
      <motion.div
        className="w-fit flex justify-center items-center text-gray-200 bold rounded-lg px-2 py-1"
        style={{
          background: color,
        }}
        initial={{
          scale: 0.5,
          opacity: 1,
        }}
        exit={{
          scale: 0.5,
          opacity: 0,
        }}
      >
        {info.name || info.email}
      </motion.div>
    </motion.div>
  );
}

export default FollowPointer;
