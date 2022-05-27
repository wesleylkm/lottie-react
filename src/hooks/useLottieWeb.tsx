import lottie, {
  AnimationConfig,
  AnimationItem,
  AnimationDirection,
  AnimationEventName,
  SVGRendererConfig,
  CanvasRendererConfig,
  HTMLRendererConfig,
} from "lottie-web";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNodeRef } from "./utils";

type FilteredEventName = Exclude<
  AnimationEventName,
  "enterFrame" | "DOMLoaded"
>;
type EventListener = {
  [K in FilteredEventName]?: (animationItem: AnimationItem) => void;
};

type LottieWebOption = {
  src: any;
  autoPlay?: boolean;
  loop?: number | boolean;
  speed?: number;
  direction?: AnimationDirection;
  exactFrame?: boolean;
  onEvent?: EventListener & {
    data_failed?: (error: any) => void;
    DOMLoaded?: (animationItem: AnimationItem) => void;
    enterFrame?: (
      animationItem: AnimationItem,
      currentFrameNumber?: number
    ) => void;
  };
} & RenderOptions;

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

function useLottieWeb(options: LottieWebOption) {
  const {
    src,
    autoPlay,
    loop,
    speed = 1,
    direction = 1,
    exactFrame = false,
    onEvent = {},
    renderer = "canvas",
    rendererSettings = {},
  } = options;

  const [node, setNodeRef] = useNodeRef();
  const lottieInstance = useRef<AnimationItem | null>();

  // Player State
  const [isPlaying, setIsPlaying] = useState(!!autoPlay);
  const [numberOfFrame, setNumberOfFrame] = useState(0);
  const [totalFrame, setTotalFrame] = useState(0);

  const loadAnimation = () => {
    if (node.current) {
      const animationConfig: AnimationConfig = {
        container: node.current,
        autoplay: autoPlay || false,
        loop: loop || false,
        // TODO:: Unable to pass in other renderer type
        renderer: renderer as any,
        rendererSettings: rendererSettings,
      };

      // Depend on src type, decide use "path" or "animationData"
      // TODO:: current react-lottie do support for src as a string that content is a JSON
      if (typeof src === "string") {
        animationConfig["path"] = src;
      } else {
        animationConfig["animationData"] = src;
      }

      lottieInstance.current = lottie.loadAnimation(animationConfig);
    }
  };

  useEffect(() => {
    loadAnimation();

    return () => {
      if (lottieInstance.current) {
        lottieInstance.current.destroy();

        lottieInstance.current = null;
      }
    };
  }, [src]);

  // Add EventListener
  useEffect(() => {
    if (lottieInstance.current) {
      const { current } = lottieInstance;

      const { enterFrame, data_failed, ...rest } = onEvent;

      current.addEventListener("enterFrame", () => {
        const currentFrame = current.currentFrame;
        setNumberOfFrame(Math.floor(currentFrame));
      });

      current.addEventListener("DOMLoaded", () => {
        const totalFrame = current.totalFrames;
        setTotalFrame(totalFrame);
      });

      if (enterFrame) {
        current.addEventListener("enterFrame", () => {
          const currentFrame = current.currentFrame + 1;
          enterFrame(current, currentFrame);
        });
      }

      for (const eventName of Object.keys(rest)) {
        const callback = onEvent[eventName];

        if (callback) {
          current.addEventListener(eventName as AnimationEventName, () => {
            callback(current);
          });
        }
      }

      if (exactFrame) {
        current.addEventListener("DOMLoaded", () => {
          current.setSubframe(false);
        });
      }

      // NOTE:: totalFrames only available after DomLoaded
      if (direction === -1) {
        current.addEventListener("DOMLoaded", () => {
          const totalFrames = current.totalFrames;

          if (autoPlay) {
            current.goToAndPlay(totalFrames - 1, true);
          } else {
            current.goToAndStop(totalFrames - 1, true);
          }
          current.setDirection(-1);
        });
      }

      if (data_failed) {
        current.addEventListener("data_failed", () => {
          data_failed("Failed to fetch lottie animation from resource");
        });
      }
    }
  }, [src]);

  // Set Direction when initial, or prop changed
  useEffect(() => {
    if (lottieInstance.current) {
      const { current } = lottieInstance;

      if (current.isPaused) {
        const totalFrames = current.totalFrames;
        current.goToAndStop(direction === -1 ? totalFrames : 0, true);
      }

      current.setDirection(direction);
    }
  }, [direction]);

  useEffect(() => {
    if (lottieInstance.current) {
      const { current } = lottieInstance;

      current.setSpeed(speed);
    }
  }, [speed]);

  /**
   *
   *
   *
   * ======== Callback ========
   *
   *
   */

  const play = useCallback(() => {
    if (lottieInstance.current) {
      lottieInstance.current.play();
      setIsPlaying(true);
    }
  }, []);

  const pause = useCallback(() => {
    if (lottieInstance.current) {
      lottieInstance.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (!lottieInstance.current) return;
    // NOTE:: If user set direction to -1, means the last frame should be the initial frame (also apply to direction useEffect)
    const { current } = lottieInstance;

    const totalFrame = current.totalFrames;
    current.goToAndStop(direction === -1 ? totalFrame - 1 : 0, true);
  }, [direction]);

  const goTo = useCallback((value: number, isFrame?: boolean) => {
    if (lottieInstance.current) {
      const { current } = lottieInstance;

      if (current.isPaused) {
        current.goToAndStop(value, isFrame || false);
      } else {
        current.goToAndPlay(value, isFrame || false);
      }
    }
  }, []);

  const goToAndPlay = useCallback((value: number, isFrame?: boolean) => {
    if (lottieInstance.current) {
      lottieInstance.current.goToAndPlay(value, isFrame);
    }
  }, []);

  const goToAndStop = useCallback((value: number, isFrame?: boolean) => {
    if (lottieInstance.current) {
      lottieInstance.current.goToAndStop(value, isFrame);
    }
  }, []);

  return {
    lottieInstance,
    setNodeRef,
    isPlaying,
    totalFrame,
    numberOfFrame,
    play,
    pause,
    stop,
    goTo,
    goToAndPlay,
    goToAndStop,
  };
}

export default useLottieWeb;
