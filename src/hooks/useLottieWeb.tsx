import lottie, {
  AnimationConfig,
  AnimationItem,
  AnimationDirection,
} from "lottie-web";
import { useCallback, useEffect, useRef } from "react";
import { useNodeRef } from "./utils";

interface LottieWebOption {
  src: any;
  direction?: AnimationDirection;
}

function useLottieWeb(options: LottieWebOption) {
  const { src, direction = 1 } = options;

  const [node, setNodeRef] = useNodeRef();
  const lottieInstance = useRef<AnimationItem | null>();

  const loadAnimation = () => {
    if (node.current) {
      const animationConfig: AnimationConfig = {
        container: node.current,
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

  const play = useCallback(() => {
    lottieInstance.current?.play();
  }, []);

  const pause = useCallback(() => {
    lottieInstance.current?.pause();
  }, []);

  const stop = useCallback(() => {
    if (!lottieInstance.current) return;
    // NOTE:: If user set direction, means the last frame should be the initial frame
    const { current } = lottieInstance;

    const totalFrame = current.totalFrames;
    current.goToAndStop(direction === -1 ? totalFrame : 0, true);
  }, [direction]);

  return { setNodeRef, play, pause, stop };
}

export default useLottieWeb;
