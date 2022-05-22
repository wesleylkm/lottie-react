import useLottieWeb from "../hooks/useLottieWeb";
import { CSSProperties, FC } from "react";

interface PlayerProps {
  src: any;
  autoPlay?: boolean;
  loop?: number | boolean;
  speed?: number;
  direction?: AnimationDirection;
  speed?: number;
}

const Player: FC<PlayerProps> = (props) => {
  const {
    src,
    autoPlay,
    loop,
    speed,
    direction,
  } = props;

  const { setNodeRef, play, pause, stop } = useLottieWeb({
    src,
    autoPlay,
    loop,
    speed,
    direction,
  });

  return (
    <div>
      <div ref={setNodeRef} style={testSize} />

      <div>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
        <button onClick={stop}>Stop</button>
      </div>
    </div>
  );
};

const testSize: CSSProperties = {
  width: "300px",
  height: "300px",
};

export default Player;
