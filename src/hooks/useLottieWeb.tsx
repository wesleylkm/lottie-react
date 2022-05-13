import lottie, { AnimationConfig, AnimationItem } from "lottie-web";
import { useCallback, useEffect, useRef, useState } from "react";

interface LottieWebOption {
  src: any;
  onError: () => void;
}

function useLottieWeb(options: LottieWebOption) {
  const { src, onError } = options;

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
        // NOTE:: For now i just destroy the lottieInstance, we can use one more ref to detect is the
        // TODO:: When OffScreen Api is done, we will modify it? To make it persistent. So the animation state is preserved.
        // Or we can store animationFrame as "React State", and when it come infront, the animation timeline is preserved.
        lottieInstance.current.destroy();
      }
    };
  }, [src]);

  // Add event listener
  // NOTE:: Error will be special handler, because we want handle error using react.
  // QUESTION:: If the animation data is not correct. lottie-web just crash, and we unable to catch it
  useEffect(() => {
    if (lottieInstance.current) {
      lottieInstance.current.addEventListener("data_failed", () => {
        if (onError) onError();
      });
    }
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
