import React, { useEffect, useState } from "react";
import KanBanBoard from "./KanBanBoard/KanBanBoard";

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
  const [activeBoard, setActiveBoard] = useState<ActibeBoard>({
    id: -1,
    loaded: false,
  });

  const [boardSelection, setBoardSelection] = useState<number>(-1) 

  useEffect(() => {
      if (Object.keys(boards).length > 0) {
          setBoardSelection(+Object.keys(boards)[0])
      }
  }, []);

  const boardSelectionChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {     
    setBoardSelection(+e.target.value)
  };

  const loadBoardHandler = () => {
    if (boardSelection != null && boardSelection > 0) {
        // Here will have to fetch tasks for selected board
      setActiveBoard({ id: boardSelection, loaded: true });
    }
  };

  let boardSelectionElement =
    Object.keys(boards).length > 0 ? (
      <div>
        <label>Select Board</label>
        <select
          id="BoardSelection"
          onChange={boardSelectionChangeHandler}
        >
          {Object.values(boards).map((board) => (
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          ))}
        </select>
        <button id="LoadBoardButton" onClick={loadBoardHandler}>
          Show
        </button>
      </div>
    ) : null;

  let board = activeBoard.loaded ? (
    <KanBanBoard name={boards[activeBoard.id].name} id={activeBoard.id} />
  ) : null;

  // Here will be state of the board
  return (
    <div>
      {boardSelectionElement}
      {board}
    </div>
  );
};

export default KanBan;
