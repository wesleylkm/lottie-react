import useLottieWeb from "../hooks/useLottieWeb";
import animationData from "../assets/guitarist.json";
import { FC } from "react";

interface PlayerProps {}

const Player: FC<PlayerProps> = () => {
  const { setNodeRef } = useLottieWeb({
    src: animationData,
  });

  return (
    <div>
      <h1>Player</h1>

      <div ref={setNodeRef} />
    </div>
  );
};

export default Player;
