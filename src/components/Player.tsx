import useLottieWeb from "../hooks/useLottieWeb";
import animationData from "../assets/guitarist.json";
import { CSSProperties, FC, useState } from "react";

interface PlayerProps {}

const Player: FC<PlayerProps> = () => {
  const [swap, setSwap] = useState(false);

  const { setNodeRef } = useLottieWeb({
    src: swap
      ? animationData
      : "https://assets2.lottiefiles.com/packages/lf20_kpx9c6si.json",
  });

  return (
    <div>
      <h1>Player</h1>

      <div ref={setNodeRef} style={testSize} />

      <button
        onClick={() => {
          setSwap(!swap);
        }}
      >
        Swap
      </button>
    </div>
  );
};

const testSize: CSSProperties = {
  width: "300px",
  height: "300px",
};

export default Player;
