import { useCallback } from "react";
import Slider from "../components/Slider";
import FrameIndicator from "./FrameIndicator";

const Control = (props) => {
  const { isPlaying, totalFrame, numberOfFrame, play, pause, goTo } = props;

  const togglePlayer = useCallback(() => {
    isPlaying ? pause() : play();
  }, [isPlaying]);

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
      }}
    >
      <button onClick={togglePlayer}>
        {isPlaying ? <PauseSvg /> : <PlaySvg />}
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: "8px",
        }}
      >
        <Slider
          value={numberOfFrame}
          maxValue={totalFrame - 1}
          onChange={goTo}
        />

        <FrameIndicator value={numberOfFrame + 1} />
      </div>
    </div>
  );
};

// NOTE:: From lottieFile lottie-react
const PauseSvg = () => (
  <svg width={14} height={14} viewBox="0 0 24 24">
    <rect height="22.9" rx="1.9" width="7.6" x="14" y=".5"></rect>
    <rect height="22.9" rx="1.9" width="7.6" x="2" y=".5"></rect>
  </svg>
);

const PlaySvg = () => (
  <svg width={14} height={14} viewBox="0 0 24 24">
    <path d="M2 3.4C2 1.9 3.5 1 4.8 1.8l16.5 9.6c1.2.7 1.2 2.5 0 3.2L4.8 24.2C3.5 25 2 24.1 2 22.6V3.4z"></path>
  </svg>
);

/**
 * Control will have thing below
 * 1. Start button, Pause button (play or pause)
 * 2. Stop button (gotoAndStop)
 * 3. Slider (goto and play/stop)
 * 4. Download & Frame Indicator
 */

export default Control;
