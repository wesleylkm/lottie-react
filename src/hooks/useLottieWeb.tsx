import lottie, {
  AnimationConfig,
  AnimationItem,
  AnimationDirection,
  AnimationEventName,
} from "lottie-web";
import { useCallback, useEffect, useRef } from "react";
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
    DOMLoaded?: (animationItem: AnimationItem) => void;
    enterFrame?: (
      animationItem: AnimationItem,
      currentFrameNumber?: number
    ) => void;
  };
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
  } = options;

  const [node, setNodeRef] = useNodeRef();
  const lottieInstance = useRef<AnimationItem | null>();

  const loadAnimation = () => {
    if (node.current) {
      const animationConfig: AnimationConfig = {
        container: node.current,
        autoplay: autoPlay || false,
        loop: loop || false,
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

      const { enterFrame, ...rest } = onEvent;

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
    }
  }, [src]);

  // Set Direction when initial, or prop changed
  useEffect(() => {
    if (lottieInstance.current) {
      const { current } = lottieInstance;

      if (current.isPaused) {
        const totalFrame = current.totalFrames;
        current.goToAndStop(direction === -1 ? totalFrame : 0, true);
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
    lottieInstance.current?.play();
  }, []);

  const pause = useCallback(() => {
    lottieInstance.current?.pause();
  }, []);

  const stop = useCallback(() => {
    if (!lottieInstance.current) return;
    // NOTE:: If user set direction to -1, means the last frame should be the initial frame (also apply to direction useEffect)
    const { current } = lottieInstance;

    const totalFrame = current.totalFrames;
    current.goToAndStop(direction === -1 ? totalFrame : 0, true);
  }, [direction]);

  return { setNodeRef, play, pause, stop };
}

export default useLottieWeb;
