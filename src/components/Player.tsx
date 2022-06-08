import useLottieWeb from "../hooks/useLottieWeb";
import React, {
  CSSProperties,
  FC,
  MutableRefObject,
  ReactElement,
  useEffect,
  useMemo,
} from "react";
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

type FilteredEventName = Exclude<
  keyof typeof PlayerEvent,
  "onFrame" | "onError"
>;
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
    onError?: (message: string) => void;
    onFrame?: (animationItem: AnimationItem, currentFrame?: number) => void;
  };
  hoverToPlay?: boolean;
  children?: ReactElement;
  lottieRef?:
    | ((instance: AnimationItem) => void)
    | MutableRefObject<AnimationItem | undefined>;
  backgroundColor?: string;
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
    children,
    lottieRef,
    backgroundColor,
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

  const {
    lottieInstance,
    setNodeRef,
    isPlaying,
    totalFrame,
    numberOfFrame,
    play,
    pause,
    goTo,
  } = useLottieWeb({
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

  useEffect(() => {
    if (lottieInstance.current && lottieRef) {
      if (typeof lottieRef === "function") {
        lottieRef(lottieInstance.current);
      } else {
        lottieRef.current = lottieInstance.current;
      }
    }
  }, []);

  return (
    <div>
      <div
        ref={setNodeRef}
        style={{
          backgroundColor,
        }}
        {...hoverProps}
      />
      {React.isValidElement(children)
        ? React.cloneElement(children, {
            isPlaying,
            numberOfFrame,
            totalFrame,
            play,
            pause,
            goTo,
          })
        : null}
    </div>
  );
};

const testSize: CSSProperties = {
  width: "200px",
  height: "200px",
  position: "relative",
  backgroundColor: "blue",
};

export default Player;
