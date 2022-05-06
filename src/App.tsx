import { Player } from "@lottiefiles/react-lottie-player";
import animationFile from "./assets/guitarist.json";

const App = () => {
  return (
    <div>
      <h1>react-lottie</h1>
      <Player src={animationFile} autoplay loop />
    </div>
  );
};

export default App;
