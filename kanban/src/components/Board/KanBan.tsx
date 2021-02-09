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

  const fetchTasks = () => {
    tasksDispatch({ type: "TASKS_FETCH_START" });
      axios
        .get(
          `/api?query={tasks_on_board(board_id:${
            userState.boards[userState.activeBoard.id].id
          }){id,title,description,severity,column}}`
        )
        .then((resp) => {
          const respData = resp.data;
          if (respData.data.tasks_on_board != null) {
            const tasks: { [id: number]: Task } = {};
            for (let i = 0; i < respData.data.tasks_on_board.length; i++) {
              let task: Task = {
                ...respData.data.tasks_on_board[i],
                description: decodeURIComponent(
                  respData.data.tasks_on_board[i].description
                ),
              };
              tasks[task.id] = task;
            }
            tasksDispatch({ type: "TASKS_FETCH", tasks: tasks });
          }
        });
  }

  useEffect(() => {
    if (userState.activeBoard.loaded) {
      fetchTasks()
    }
  }, [
    userState.activeBoard.id,
    userState.activeBoard.loaded,
    userState.boards,
    tasksDispatch,
  ]);

  const loadBoardHandler = (boardSelection: number | null) => {
    if (boardSelection != null && boardSelection > 0) {
      const key =
        userState.boards !== null
          ? userState.boards.findIndex((board) => board.id === boardSelection)
          : -1;
      userDispatch({ type: "SET_ACTIVE_BOARD", id: key });
    }
  };

  const createBoardHandler = (newBoardname: string) => {
    if (!userState.loggedIn) return;
    const data = {
      query: `mutation{add_board(name:"${newBoardname}",owner:${userState.userID}){id,name}}`,
    };
    axios
      .post("/api", data)
      .then((resp) => {
        const respData = resp.data;
        if (respData.data.add_board !== null) {
          // Add board to user context
          userDispatch({
            type: "ADD_BOARD",
            board: { ...respData.data.add_board, isOwner: true },
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteBoardHandler = (board_id: number) => {
    const data = {
      query: `mutation{delete_board(id:${board_id}){id}}`,
    };
    axios
      .post("/api", data)
      .then((resp) => {
        // If succeded, dispatch a delete
        if (!resp.data.errors) {
          userDispatch({ type: "DELETE_BOARD", board_id: board_id });
        }
      })
      .catch((err) => console.log(err));
  };

  const boardLeaveHandler = (board_id: number) => {
    const data = {
      query: `mutation{remove_user_from_board(board_id:${board_id}, user_id:${userState.userID}){id}}`,
    };
    axios
      .post("/api", data)
      .then((resp) => {
        console.log(resp)
        const respData = resp.data;
        if (
          respData.data.remove_user_from_board !== null &&
          respData.data.remove_user_from_board.id === userState.userID
        ) {
          userDispatch({ type: "LEAVE_BOARD", board_id: board_id });
        } else if (respData.errors) {
          console.log(respData.errors[0].message);
        }
      })
      .catch((err) => console.log(err));
  };

  let board =
    userState.activeBoard.loaded && userState.boards !== null ? (
      <KanBanBoard
        userID={userState.userID}
        board={userState.boards[userState.activeBoard.id]}
        boardDelete={deleteBoardHandler}
        boardLeave={boardLeaveHandler}
        fetchTasks={fetchTasks}
      />
    ) : null;

  return (
    <div>
      <Toolbar
        user={userState.username}
        boards={userState.boards}
        createHandler={createBoardHandler}
        loadHandler={loadBoardHandler}
        logOutHandler={logOutHandler}
      />
      {board}
    </div>
  );
};

export default KanBan;
