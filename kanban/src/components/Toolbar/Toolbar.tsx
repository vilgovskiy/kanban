import React, { useState } from "react";
import "./Toolbar.css";

interface Board {
  id: number;
  name: string;
  isOwner: boolean;
}

interface Props {
  user: string;
  boards: Board[];
  createHandler: (newBoardName: string) => void
  loadHandler: (boardSelection: number | null) => void;
  logOutHandler: () => void;
}

const Toolbar = (props: Props) => {
  const [boardSelection, setBoardSelection] = useState<number>(
    props.boards.length > 0 ? props.boards[0].id : -1
  );

  const [boardCreateInput, setBoardCreateInput] = useState<string>("");

  const boardSelectionChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBoardSelection(+e.target.value);
  };

  const boardNameInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBoardCreateInput(event.target.value);
  }

  const boardCreationElement = <div>
    <label>Create a board</label>
    <input type="text" value={boardCreateInput} placeholder="New board name" onChange={boardNameInputChangeHandler}/>
    <button onClick={() => props.createHandler(boardCreateInput)}>Create</button>
  </div>

  const boardSelectionElement =
    props.boards.length > 0 ? (
      <div className="BoardSelection">
        <label>Or select a board:</label>
        <select id="BoardSelection" onChange={boardSelectionChangeHandler}>
          {props.boards.map((board) => (
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          ))}
        </select>
        <button
          id="LoadBoardButton"
          onClick={() => props.loadHandler(boardSelection)}
        >
          Load
        </button>
      </div>
    ) : null;

  return (
    <div className="Toolbar">
      <h3>Hello <span style={{fontSize: (5/props.user.length) + "em"}}>{props.user}!</span></h3>
      <button className="LogOutButton" onClick={props.logOutHandler}>Log out</button>
      {boardCreationElement}
      {boardSelectionElement}
    </div>
  );
};

export default Toolbar;
