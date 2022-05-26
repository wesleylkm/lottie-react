import { CSSProperties } from "react";
import CurrentPlayer from "./components/CurrentPlayer";
import Player from "./components/Player";
import Control from "./components/Control";

const App = () => {
  return (
    <div style={CenterStyle}>
      <Player src="https://assets3.lottiefiles.com/packages/lf20_5f2kwbj1.json">
        <Control />
      </Player>
    </div>
  );
};
// src="https://assets9.lottiefiles.com/private_files/lf30_rg3w28ud.json"
// src="https://assets3.lottiefiles.com/packages/lf20_5f2kwbj1.json"

const CenterStyle: CSSProperties = {
  height: "100%",
  display: "flex",
  justifyContent: "center",
};

export default App;

// ? "https://assets6.lottiefiles.com/private_files/lf30_0ffmp6vx.json"
// : "https://assets3.lottiefiles.com/packages/lf20_5f2kwbj1.json"
