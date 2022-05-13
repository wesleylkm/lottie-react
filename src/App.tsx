import Player from "./components/Player";
import animationData from "./assets/guitarist.json";

const App = () => {
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        React-lottie
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Player
          src="https://assets2.lottiefiles.com/packages/lf20_l3awcbpv.json"
          // src={animationData}
        />
      </div>
    </div>
  );
};

export default App;
