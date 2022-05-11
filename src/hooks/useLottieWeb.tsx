import { useEffect, useRef } from "react";
import lottie, { AnimationItem } from "lottie-web";

interface PlayerOptions {
  // TODO:: What will be the type of src? It can be a string and a JSON object?
  src: any;
}

// This hook will accept options that will pass to loadAnimation()
const useLottieWeb = (options: PlayerOptions) => {
  const { src } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  // TODO:: Return lottieInstance (ref) is not elegant, because use need to access by .current
  // But if return .current, it will be empty because it not yet begin initialize
  const lottieInstance = useRef<AnimationItem | null>(null);

  // This effect is called twice in React 18 <StrictMode />, to overcome this, we need an extra ref to flag it
  useEffect(() => {
    if (containerRef.current) {
      const instance = lottie.loadAnimation({
        animationData: src,
        container: containerRef.current,
      });

      lottieInstance.current = instance;
    }

    return () => {
      if (lottieInstance.current) {
        lottieInstance.current.destroy();
      }
    };
  }, []);

  return { containerRef, lottieInstance };
};

export default useLottieWeb;
