import lottie, { AnimationItem } from "lottie-web";
import { useCallback, useEffect, useRef } from "react";

interface LottieWebOptions {
  src: any;
}

const useLottieWeb = (options: LottieWebOptions) => {
  const { src } = options;

  const [node, setNodeRef] = useNodeRef();
  const lottieInstance = useRef<AnimationItem>();

  useEffect(() => {
    if (node.current) {
      // Load the animation using "lottie-web"
      lottieInstance.current = lottie.loadAnimation({
        animationData: src,
        container: node.current,
      });
    }

    return () => {
      if (lottieInstance.current) {
        lottieInstance.current.destroy();
      }
    };
  }, []);

  return { setNodeRef };
};

// Instead of passing the node refObj outside, we only pass a function to get refer node from
// the user.
const useNodeRef = () => {
  const node = useRef<HTMLElement | null>(null);

  const setNodeRef = useCallback((element: HTMLElement | null) => {
    node.current = element;
  }, []);

  return [node, setNodeRef] as const;
};

export default useLottieWeb;
