import { useState } from "react";
import "./Player.css";

export default function Player({ playerName, symbol }) {
  const [isEditing, setIsEditing] = useState(false);

  function onEditPlayerName() {
    console.log("setIsEditing", isEditing);
    // setIsEditing(!isEditing);
    setIsEditing((editing) => !editing);
  }
  let editButtonName = "Edit";
  let playersName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    playersName = <input type="text" required value={playerName} />;
    editButtonName = "Save";
  }

  return (
    <li>
      <span className="player">
        {playersName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={onEditPlayerName}>{editButtonName}</button>
    </li>
  );
}
