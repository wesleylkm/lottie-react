import lottie, { AnimationConfig, AnimationItem } from "lottie-web";
import { useCallback, useEffect, useRef } from "react";
import { useNodeRef } from "./utils";

interface LottieWebOption {
  src: any;
}

function useLottieWeb(options: LottieWebOption) {
  const { src } = options;

  const [node, setNodeRef] = useNodeRef();
  const lottieInstance = useRef<AnimationItem | null>();

  const loadAnimation = () => {
    if (node.current) {
      const animationConfig: AnimationConfig = {
        container: node.current,
      };

      // Depend on src type, decide use "path" or "animationData"
      // TODO:: current lottie-web do support for src as a string that content is a JSON
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

  const play = useCallback(() => {
    lottieInstance.current?.play();
  }, []);

  const pause = useCallback(() => {
    lottieInstance.current?.pause();
  }, []);

  return { setNodeRef, play, pause };
}

export default useLottieWeb;
