import React, { useContext, useEffect } from "react";
import KanBanBoard from "./KanBanBoard/KanBanBoard";
import { UserContext } from "../../context/user-context";
import { TasksContext } from "../../context/tasks-context";
import axios from "../../axios-api";
import Toolbar from "../Toolbar/Toolbar";

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

  const logOutHandler = () => {
    userDispatch({ type: "LOG_OUT" });
  };

  useEffect(() => {
    if (userState.activeBoard.loaded) {
      tasksDispatch({ type: "TASKS_FETCH_START" });
      axios
        .get(
          `/api?query={tasks_on_board(board_id:${userState.boards[userState.activeBoard.id].id}){id,title,description,severity,column}}`
        )
        .then((resp) => {
          const respData = resp.data;
          if (respData.data.tasks_on_board != null) {
            const tasks: { [id: number]: Task } = {};
            for (let i = 0; i < respData.data.tasks_on_board.length; i++) {
              let task: Task = respData.data.tasks_on_board[i];
              tasks[task.id] = task;
            }
            tasksDispatch({ type: "TASKS_FETCH", tasks: tasks });
          }
        });
    }
  },[userState.activeBoard.id, userState.activeBoard.loaded, userState.boards ])

  const loadBoardHandler = (boardSelection: number | null) => {
    if (boardSelection != null && boardSelection > 0) {
      const key = userState.boards !== null ? userState.boards.findIndex(board => board.id === boardSelection) : -1
      userDispatch({ type: "SET_ACTIVE_BOARD", id: key});
    }
  };

  const createBoardHandler = (newBoardname: string) => {
    if (!userState.loggedIn) return
    const data = {
      query: `mutation{add_board(name:"${newBoardname}",owner:${userState.userID}){id,name}}`
    }
    axios.post("/api", data)
    .then(resp => {
      const respData = resp.data;
      if (respData.data.add_board !== null) {
        // Add board to user context
        userDispatch({type: "ADD_BOARD", board: {...respData.data.add_board, isOwner: true}})
      }
    }).catch(err => console.log(err))
  }


  let board = userState.activeBoard.loaded && userState.boards !== null? (
    <KanBanBoard board={userState.boards[userState.activeBoard.id]} />
  ) : null;

  return (
    <div>
      <Toolbar user={userState.username} boards={userState.boards} createHandler={createBoardHandler} loadHandler={loadBoardHandler} logOutHandler={logOutHandler}/>
      {board}
    </div>
  );
};

export default KanBan;
