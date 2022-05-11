import { useEffect, useRef } from "react";
import lottie, { AnimationItem } from "lottie-web";

interface PlayerOptions {
  // TODO:: What will be the type of src? It can be a string and a JSON object?
  src: any;
}

const useLottieWeb = (options: PlayerOptions) => {
  const { src } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const lottieInstance = useRef<AnimationItem | null>(null);

  // This effect is called twice in React 18 <StrictMode />, to overcome this, we need an extra ref to flag it
  useEffect(() => {
    if (containerRef.current)
      lottieInstance.current = lottie.loadAnimation({
        animationData: src,
        container: containerRef.current,
      });

    return () => {
      if (lottieInstance.current) {
        lottieInstance.current.destroy();
      }
    };
  }, []);

  // This hook will accept options that will pass to loadAnimation()
  return { containerRef };
};

export default useLottieWeb;
