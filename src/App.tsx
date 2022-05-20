import Player from "./components/Player";
import animationData from "./assets/growth-chart.json";

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
          src="https://assets6.lottiefiles.com/private_files/lf30_0ffmp6vx.json"
          // src={animationData}
        />
      </div>
    </div>
  );
};

export default App;
