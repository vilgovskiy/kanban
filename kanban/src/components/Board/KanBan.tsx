import React, { useContext, useEffect, useState } from "react";
import KanBanBoard from "./KanBanBoard/KanBanBoard";
import { UserContext } from "../../context/user-context";
import { TasksContext } from "../../context/tasks-context";
import axios from "../../axios-api";

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

interface Task {
  id: number;
  title: string;
  description: string;
  severity: number;
  column: number;
}

const KanBan: React.FC = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const { tasksDispatch } = useContext(TasksContext);

  const [activeBoard, setActiveBoard] = useState<ActibeBoard>({
    id: -1,
    loaded: false,
  });

  const [boardSelection, setBoardSelection] = useState<number>(-1);

  useEffect(() => {
    if (userState.boards !== null && Object.keys(userState.boards).length > 0) {
      console.log(
        "setting board selection to ",
        +Object.keys(userState.boards)[0]
      );
      setBoardSelection(userState.boards[0].id);
    }
  }, [userState.boards]);

  const logOutHandler = () => {
    userDispatch({ type: "LOG_OUT" });
  };

  const boardSelectionChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBoardSelection(+e.target.value);
  };

  const loadBoardHandler = () => {
    if (boardSelection != null && boardSelection > 0) {
      tasksDispatch({ type: "TASKS_FETCH_START" });
      axios
        .get(
          `/api?query={tasks_on_board(board_id:${boardSelection}){id,title,description,severity,column}}`
        )
        .then((resp) => {
          const respData = resp.data;
          if (respData.data.tasks_on_board != null) {
            const tasks: {[id: number]: Task} = {}
            for (let i = 0; i < respData.data.tasks_on_board.length; i++){
              let task:Task = respData.data.tasks_on_board[i]
              tasks[task.id] = task
            }
            console.log(tasks)
            tasksDispatch({ type: "TASKS_FETCH", tasks: tasks });
          }
        });
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
    ) : (
      <p>Currently you are not part of any board</p>
    );

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
