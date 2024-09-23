import Player from "./Components/Player/Player.jsx";
import GameBoard from "./Components/GameBoard/GameBoard.jsx";
import { useState } from "react";
import Log from "./Components/Log/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./Components/GameOver/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Helper to determine active player based on turn history
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

// Helper to determine if there's a winner
function checkWinner(gameBoard, playerName) {
  for (const combination of WINNING_COMBINATIONS) {
    let firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    let secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    let thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      return playerName[firstSquareSymbol];
    }
  }
  return null;
}

// Helper to generate the game board state from turns
function generateGameBoard(gameTurns) {
  const board = [...initialGameBoard.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    board[row][col] = player;
  }
  return board;
}

function App() {
  const [playerName, setPlayerName] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurns, setGameTurn] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = generateGameBoard(gameTurns);
  const winner = checkWinner(gameBoard, playerName);
  const gameDraw = gameTurns.length === 9 && !winner;

  // Handle player name changes
  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currentPlayer) => (currentPlayer === "X" ? "O" : "X"));
    setGameTurn((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];
      return updatedTurns;
    });
  }

  // Handle game rematch
  function handleRematch() {
    setGameTurn([]);
  }

  // Handle player name changes
  function handlePlayerNameChange(symbol, newName) {
    setPlayerName((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <header>
        <img src="game-logo.png" alt="game_logo.png" />
        <h1>Tic-Tac-Toe</h1>
      </header>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={playerName.X}
            symbol="X"
            onChangeName={handlePlayerNameChange}
            isActive={activePlayer === "X"}
          />
          <Player
            initialName={playerName.O}
            symbol="O"
            onChangeName={handlePlayerNameChange}
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner || gameDraw) && (
          <GameOver winner={winner} onRestart={handleRematch} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
