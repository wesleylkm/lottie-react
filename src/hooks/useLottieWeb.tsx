import lottie, { AnimationConfig, AnimationItem } from "lottie-web";
import { useCallback, useEffect, useRef } from "react";

interface LottieWebOption {
  src: any;
}

function useLottieWeb(options: LottieWebOption) {
  const { src } = options;

  const [node, setNodeRef] = useNodeRef();
  const lottieInstance = useRef<AnimationItem>();

  useEffect(() => {
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

    return () => {
      if (lottieInstance.current) {
        lottieInstance.current.destroy();
      }
    };
  }, [src]);

  return { setNodeRef };
}

// Instead of passing the node refObj outside, we only pass a function to get refer node from
// the user.
function useNodeRef() {
  const node = useRef<HTMLElement | null>(null);

  const setNodeRef = useCallback((element: HTMLElement | null) => {
    node.current = element;
  }, []);

  return [node, setNodeRef] as const;
}

export default useLottieWeb;
