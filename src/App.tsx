import Player from "./components/Player";

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
        <Player />
      </div>
    </div>
  );
};

export default App;
