import useLottieWeb from "../hooks/useLottieWeb";
import animationData from "../assets/guitarist.json";

const Player = () => {
  const { containerRef } = useLottieWeb({
    src: animationData,
  });

  return (
    <div>
      <h1>Below is the container</h1>

      <div ref={containerRef} />
    </div>
  );
};

export default Player;
