import React, { useContext, useEffect, useState } from "react";
import KanBanBoard from "./KanBanBoard/KanBanBoard";
import axios from "../../axios-api";
import { UserContext } from "../../context/user-context";

interface Board {
  id: number;
  name: string;
  description: string;
}

let boards: { [id: number]: Board } = {
  1: {
    id: 1,
    name: "Board 1",
    description: "Board 1 description",
  },
  2: {
    id: 2,
    name: "Board 2",
    description: "Board 2 description",
  },
  3: {
    id: 3,
    name: "Board 3",
    description: "Board 3 description",
  },
  4: {
    id: 4,
    name: "Board 4",
    description: "Board 4 description",
  },
  5: {
    id: 5,
    name: "Board 5",
    description: "Board 5 description",
  },
};

interface ActibeBoard {
  id: number;
  loaded: boolean;
}

const KanBan: React.FC = () => {
  const { userState, userDispatch } = useContext(UserContext)

  const [activeBoard, setActiveBoard] = useState<ActibeBoard>({
    id: -1,
    loaded: false,
  });

  const [boardSelection, setBoardSelection] = useState<number>(-1);

  useEffect(() => {
    if (userState.boards !== null && Object.keys(userState.boards).length > 0) {
      setBoardSelection(+Object.keys(userState.boards )[0]);
    }
  }, []);

  const logOutHandler = () => {
    userDispatch({type: "LOG_OUT"})
  }


  const boardSelectionChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBoardSelection(+e.target.value);
  };

  const loadBoardHandler = () => {
    if (boardSelection != null && boardSelection > 0) {
      // Here will have to fetch tasks for selected board
      setActiveBoard({ id: boardSelection, loaded: true });
    }
  };

  let boardSelectionElement =
    userState.boards !== null && Object.keys(userState.boards).length > 0 ? (
      <div>
        <label>Select Board</label>
        <select id="BoardSelection" onChange={boardSelectionChangeHandler}>
          {Object.values(userState.boards).map((board) => (
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          ))}
        </select>
        <button id="LoadBoardButton" onClick={loadBoardHandler}>
          Show
        </button>
      </div>
    ) : <p>Currently you are not part of any board</p>;

  let board = activeBoard.loaded ? (
    <KanBanBoard name={boards[activeBoard.id].name} id={activeBoard.id} />
  ) : null;

  // Here will be state of the board
  return (
    <div>
      <button onClick={logOutHandler}>Log out</button>
      {boardSelectionElement}
      {board}
    </div>
  );
};

export default KanBan;
