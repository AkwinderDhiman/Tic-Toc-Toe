import Player from "./Components/Player/Player.jsx";


function App() {
  return (
    // <header>
    //   <img src="game-logo.png" alt="game_logo.png" />
    //   <h1>Tic-Tac-Toe</h1>
    // </header>
    <main>
      <div id="game-container">
        <ol id="players">
          <Player playerName="Player 1" symbol="O"/>
           
          <Player playerName="Player 2" symbol="X"/>
        </ol>
        <div id="game-board">
          <ol></ol>
        </div>
      </div>
    </main>
  );
}

export default App;
