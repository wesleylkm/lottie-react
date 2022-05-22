import { CSSProperties } from "react";
import Player from "./components/Player";

const App = () => {
  return (
    <div style={CenterStyle}>
      <Player src="https://assets3.lottiefiles.com/packages/lf20_5f2kwbj1.json" />
    </div>
  );
};

const CenterStyle: CSSProperties = {
  height: "100%",
  display: "flex",
  justifyContent: "center",
};

export default App;

// ? "https://assets6.lottiefiles.com/private_files/lf30_0ffmp6vx.json"
// : "https://assets3.lottiefiles.com/packages/lf20_5f2kwbj1.json"
