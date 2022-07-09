import React from "react";
import "../styles/App.css";
import Resizer from "../components/Resizer";
import Game from "../components/Game";

function App() {
  return (
    <div className="App">
      <Resizer>
        <Game />
      </Resizer>
    </div>
  );
}

export default App;
