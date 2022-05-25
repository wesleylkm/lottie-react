import useLottieWeb from "../hooks/useLottieWeb";
import { CSSProperties, FC, useMemo } from "react";
import {
  AnimationDirection,
  AnimationItem,
  CanvasRendererConfig,
  HTMLRendererConfig,
  SVGRendererConfig,
} from "lottie-web";
import { useHover } from "@react-aria/interactions";

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

type FilteredEventName = Exclude<keyof typeof PlayerEvent, "onFrame">;
type FilteredEventListener = {
  [K in FilteredEventName]?: (animationItem: AnimationItem) => void;
};

// TODO:: Split playerProps and useLottieWeb hooks props
type PlayerProps = {
  src: any;
  autoPlay?: boolean;
  loop?: number | boolean;
  speed?: number;
  direction?: AnimationDirection;
  exactFrame?: boolean;
  onEvent?: FilteredEventListener & {
    onFrame?: (animationItem: AnimationItem, currentFrame?: number) => void;
  };
  hoverToPlay?: boolean;
} & Partial<RenderOptions>;

type RenderOptions =
  | {
      renderer: "html";
      rendererSettings: HTMLRendererConfig;
    }
  | {
      renderer: "svg";
      rendererSettings: SVGRendererConfig;
    }
  | {
      renderer: "canvas";
      rendererSettings: CanvasRendererConfig;
    };

const Player: FC<PlayerProps> = (props) => {
  const {
    src,
    autoPlay,
    loop,
    speed,
    direction,
    exactFrame,
    onEvent = {},
    renderer = "svg",
    rendererSettings = {},
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
    exactFrame,
    onConfigReady,
    onDataReady,
    onFrame,
    onDomLoaded,
    onLoopComplete,
    onComplete,
    onDestroy,
    onError,
  ]);

  const { setNodeRef, play, pause } = useLottieWeb({
    src,
    autoPlay,
    loop,
    speed,
    direction,
    exactFrame,
    onEvent: AllEvent,
    renderer,
    rendererSettings,
  });

  const { hoverProps } = useHover({
    isDisabled: !hoverToPlay,
    onHoverStart: play,
    onHoverEnd: pause,
  });

  return (
    <div style={{ marginTop: "200px" }}>
      <div ref={setNodeRef} style={testSize} {...hoverProps} />
    </div>
  );
};

const testSize: CSSProperties = {
  width: "300px",
  height: "300px",
  position: "relative",
};

export default Player;
