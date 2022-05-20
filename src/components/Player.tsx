import useLottieWeb from "../hooks/useLottieWeb";
import { CSSProperties, FC } from "react";

interface PlayerProps {
  src: any;
}

const Player: FC<PlayerProps> = (props) => {
  const { src } = props;

  const { setNodeRef, play, pause } = useLottieWeb({
    src,
  });

  return (
    <div>
      <div ref={setNodeRef} style={testSize} />

      <div>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
      </div>
    </div>
  );
};

const testSize: CSSProperties = {
  width: "300px",
  height: "300px",
};

export default Player;
