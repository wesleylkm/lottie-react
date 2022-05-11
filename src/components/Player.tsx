import useLottieWeb from "../hooks/useLottieWeb";
import animationData from "../assets/guitarist.json";
import { FC, useEffect } from "react";

interface PlayerProps {}

const Player: FC<PlayerProps> = () => {
  const { containerRef, lottieInstance } = useLottieWeb({
    src: animationData,
  });

  return (
    <div>
      <h1>Below is the container</h1>

      <div
        ref={containerRef}
        style={{
          width: "300px",
          height: "300px",
        }}
      />

      <div>
        <button
          onClick={() => {
            if (lottieInstance.current) {
              const { current } = lottieInstance;

              current.togglePause();
            }
          }}
        >
          Pause
        </button>
      </div>
    </div>
  );
};

export default Player;
