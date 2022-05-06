// This is the current lottie-react implementation
import { Player } from "@lottiefiles/react-lottie-player";
import AnimationData from "../assets/guitarist.json";

const CurrentPlayer = () => (
  <Player
    src={AnimationData}
    autoplay
    loop
    controls
    style={{ height: "300px", width: "300px" }}
  />
);

export default CurrentPlayer;
