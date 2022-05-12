import lottie, {
  AnimationConfigWithData,
  AnimationConfigWithPath,
  AnimationItem,
} from "lottie-web";
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
      const processedOption: AnimationConfigWithPath | AnimationConfigWithData =
        {
          container: node.current,
        };

      if (typeof src === "string") {
        (processedOption as AnimationConfigWithPath).path = src;
      } else {
        (processedOption as AnimationConfigWithData).animationData = src;
      }

      // Load the animation using "lottie-web"
      lottieInstance.current = lottie.loadAnimation(processedOption);
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
