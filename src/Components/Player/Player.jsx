import { useState } from "react";
import "./Player.css";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  // Toggles edit mode
  function onEditPlayerName() {
    // setIsEditing(!isEditing);
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  // Updates playerName from input field
  function onUpdatePlayerName(event) {
    setPlayerName(event.target.value);
  }

  // Toggles between "Edit" and "Save"
  let editButtonName = "Edit";
  let playersName = <span className="player-name">{playerName}</span>;

  // If in editing mode, show input field
  if (isEditing) {
    playersName = (
      <input
        type="text"
        required
        value={playerName}
        onChange={onUpdatePlayerName}
      />
    );
    editButtonName = "Save";
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {playersName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={onEditPlayerName}>{editButtonName}</button>
    </li>
  );
}
