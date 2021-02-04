import React, { useContext, useState } from "react";
import KanBanBoard from "./KanBanBoard/KanBanBoard";
import { UserContext } from "../../context/user-context";
import { TasksContext } from "../../context/tasks-context";
import axios from "../../axios-api";
import Toolbar from "../Toolbar/Toolbar";

interface ActiveBoard {
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
  console.log("renderring kanban")
  const { userState, userDispatch } = useContext(UserContext);
  const { tasksDispatch } = useContext(TasksContext);

  const [activeBoard, setActiveBoard] = useState<ActiveBoard>({
    id: -1,
    loaded: false,
  });

  const logOutHandler = () => {
    userDispatch({ type: "LOG_OUT" });
  };

  const loadBoardHandler = (boardSelection: number | null) => {
    if (boardSelection != null && boardSelection > 0) {
      tasksDispatch({ type: "TASKS_FETCH_START" });
      axios
        .get(
          `/api?query={tasks_on_board(board_id:${boardSelection}){id,title,description,severity,column}}`
        )
        .then((resp) => {
          const respData = resp.data;
          if (respData.data.tasks_on_board != null) {
            const tasks: { [id: number]: Task } = {};
            for (let i = 0; i < respData.data.tasks_on_board.length; i++) {
              let task: Task = respData.data.tasks_on_board[i];
              tasks[task.id] = task;
            }
            console.log(tasks);
            tasksDispatch({ type: "TASKS_FETCH", tasks: tasks });
          }
        });
      const key = userState.boards !== null ? userState.boards.findIndex(board => board.id === boardSelection) : -1
      setActiveBoard({ id: key, loaded: true });
    }
  };


  let board = activeBoard.loaded && userState.boards !== null? (
    <KanBanBoard board={userState.boards[activeBoard.id]} />
  ) : null;

  return (
    <div>
      <Toolbar user={userState.username} boards={userState.boards} loadHandler={loadBoardHandler} logOutHandler={logOutHandler}/>
      {board}
    </div>
  );
};

export default KanBan;
