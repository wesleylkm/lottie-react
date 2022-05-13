import useLottieWeb from "../hooks/useLottieWeb";
import { CSSProperties, FC } from "react";

interface PlayerProps {
  src: any;
}

const Player: FC<PlayerProps> = (props) => {
  const { src } = props;

  const { setNodeRef } = useLottieWeb({
    src,
    onError() {
      console.log("Calling from: onError");
    },
  });

  return (
    <div>
      <div ref={setNodeRef} style={testSize} />
    </div>
  );
};

const testSize: CSSProperties = {
  width: "300px",
  height: "300px",
};

export default Player;
