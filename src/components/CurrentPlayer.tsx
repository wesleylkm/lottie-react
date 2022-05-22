// This is the current lottie-react implementation
import { Player } from "@lottiefiles/react-lottie-player";
import AnimationData from "../assets/guitarist.json";

const CurrentPlayer = () => (
  <Player
    src="https://assets10.lottiefiles.com/packages/lf20_lzpnnin5.json"
    autoplay
    loop
    controls
    style={{ height: "300px", width: "300px" }}
    hover
    keepLastFrame
  />
);

export default CurrentPlayer;
