import useLottieWeb from "../hooks/useLottieWeb";
import { CSSProperties, FC, useMemo } from "react";
import { AnimationDirection, AnimationItem } from "lottie-web";

// This object use to map "name" to lottieWeb eventName
const PlayerEvent = {
  onConfigReady: "config_ready",
  onDataReady: "data_ready",
  onFrame: "enterFrame",
  onDomLoaded: "DOMLoaded",
  onComplete: "complete",
  onLoopComplete: "loopComplete",
  onDestroy: "destroy",
  onError: "data_failed",
};

// TODO:: Split playerProps and useLottieWeb hooks props
interface PlayerProps {
  src: any;
  autoPlay?: boolean;
  loop?: number | boolean;
  speed?: number;
  direction?: AnimationDirection;
  onEvent?: {
    [K in keyof typeof PlayerEvent]?: (animationItem: AnimationItem) => void;
  };
  hoverToPlay?: boolean;
}

const Player: FC<PlayerProps> = (props) => {
  const {
    src,
    autoPlay,
    loop,
    speed,
    direction,
    onEvent = {},
    hoverToPlay = false,
  } = props;

  const {
    onConfigReady,
    onDataReady,
    onFrame,
    onDomLoaded,
    onLoopComplete,
    onComplete,
    onDestroy,
    onError,
  } = onEvent;

  const AllEvent = useMemo(() => {
    const result = {};

    for (const eventName of Object.keys(onEvent)) {
      const mapToLottieEventName = PlayerEvent[eventName];

      result[mapToLottieEventName] = onEvent[eventName];
    }

    return result;
  }, [
    onConfigReady,
    onDataReady,
    onFrame,
    onDomLoaded,
    onLoopComplete,
    onComplete,
    onDestroy,
    onError,
  ]);

  const { setNodeRef, play, pause, stop } = useLottieWeb({
    src,
    autoPlay,
    loop,
    speed,
    direction,
    onEvent: AllEvent,
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
