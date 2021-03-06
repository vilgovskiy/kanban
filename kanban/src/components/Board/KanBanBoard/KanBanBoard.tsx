import axios from "../../../axios-api";
import React, { useContext, useState } from "react";
import { TasksContext } from "../../../context/tasks-context";
import TaskForm from "../../TaskForm/TaskForm";
import KanbanColumn from "../KanBanColumn/KanBanColumn";
import {
  MdAdd,
  MdDelete,
  MdExitToApp,
  MdPeople,
  MdRefresh,
} from "react-icons/md";

import "./KanBanBoard.css";
import AccessControl from "../../AccessControl/AccessControl";

interface Column {
  id: number;
  name: string;
}

interface BoardType {
  id: number;
  name: string;
  isOwner: boolean;
}

interface Props {
  userID: number | null;
  board: BoardType;
  boardDelete: (board_id: number) => void;
  boardLeave: (board_id: number) => void;
  fetchTasks: () => void;
}

const columns: Column[] = [
  { id: 0, name: "Backlog" },
  { id: 1, name: "Assigned" },
  { id: 2, name: "In Progress" },
  { id: 3, name: "QA" },
  { id: 4, name: "Completed" },
];

const Board: React.FC<Props> = ({
  userID,
  board,
  boardDelete,
  boardLeave,
  fetchTasks,
}) => {
  const { tasksState, tasksDispatch } = useContext(TasksContext);
  const [taskForm, setTaskForm] = useState<boolean>(false);
  const [accessControlActive, setAccessControlActive] = useState<boolean>(
    false
  );

  let tasks = tasksState.tasks;

  const onDragEnterHandler = (
    event: React.DragEvent<HTMLDivElement>,
    columnID: number
  ) => {
    event.preventDefault();
    tasksDispatch({ type: "DRAG_UPDATE", column: columnID });
  };

  const onDragEndHandler = (
    event: React.DragEvent<HTMLDivElement>,
    taskID: number
  ) => {
    event.preventDefault();
    if (tasksState.tasks[taskID].column !== tasksState.dragOverColumn) {
      const data = {
        query: `mutation {
        move_task(task_id:${taskID}, column:${tasksState.dragOverColumn}){
          id,
          title,
          description,
          severity,
          column
        }
      }`,
      };
      axios
        .post("/api", data)
        .then((resp) => {
          const respdata = resp.data;
          if (
            respdata.data.move_task !== null &&
            respdata.data.move_task.id === taskID
          ) {
            tasksDispatch({ type: "TASK_UPDATE", taskID: taskID });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const taskDeleteHandler = (task_id: number) => {
    const data = {
      query: `mutation{delete_task(id:${task_id}){id}}`,
    };
    axios
      .post("/api", data)
      .then((resp) => {
        const respData = resp.data;
        if (
          respData.data.delete_task != null &&
          respData.data.delete_task.id === task_id
        ) {
          tasksDispatch({ type: "DELETE_TASK", task_id: task_id });
        } else if (respData.errors) {
          console.log(respData.errors);
        }
      })
      .catch((err) => console.log(err));
  };

  const openNewTaskFormHandler = () => setTaskForm(true);
  const closeNewTaskFormHandler = () => setTaskForm(false);

  const openAccesControlHandler = () => setAccessControlActive(true);
  const closeAccesControlHandler = () => setAccessControlActive(false);

  const newTaskForm = taskForm ? (
    <TaskForm
      type="CREATE"
      board_id={board.id}
      formCloseHandler={closeNewTaskFormHandler}
    />
  ) : null;

  const accessControlElement = accessControlActive ? (
    <AccessControl
      user_id={userID}
      board_id={board.id}
      closeHandler={closeAccesControlHandler}
    />
  ) : null;

  const boardControls = (
    <div className="BoardControls">
      <h1>{board.name}</h1>
      <div
        className="General-btn Confirm-btn AddTask"
        onClick={openNewTaskFormHandler}
      >
        <MdAdd size={30} />
        Add Task
      </div>
      <div className="General-btn Util-btn AddTask" onClick={fetchTasks}>
        <MdRefresh size={30} />
        Refresh
      </div>
      {board.isOwner ? (
        <React.Fragment>
          <div
            className="General-btn Cancel-btn DeleteIcon"
            onClick={() => boardDelete(board.id)}
          >
            <MdDelete size={30} />
          </div>
          <div
            className="General-btn Warning-btn AccessControlButton"
            onClick={openAccesControlHandler}
          >
            <MdPeople size={30} /> Access control
          </div>
        </React.Fragment>
      ) : (
        <div
          className="General-btn Cancel-btn LeaveButton"
          onClick={() => boardLeave(board.id)}
        >
          <MdExitToApp size={30} />
          Leave
        </div>
      )}
      {newTaskForm}
      {accessControlElement}
    </div>
  );

  return (
    <div className="KanBanBoard">
      {boardControls}
      <div className="Columns">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            name={column.name}
            columnId={column.id}
            tasks={Object.values(tasks).filter(
              (task) => task.column === column.id
            )}
            onDragEnter={onDragEnterHandler}
            onDragEnd={onDragEndHandler}
            onTaskDelete={taskDeleteHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(
  Board,
  (oldProps, nextProps) => oldProps.board.id === nextProps.board.id
);
