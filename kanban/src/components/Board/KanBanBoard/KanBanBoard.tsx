import React, { useContext, useState } from "react";
import { TasksContext } from "../../../context/tasks-context";
import TaskForm from "../../TaskForm/TaskForm";
import KanbanColumn from "../KanBanColumn/KanBanColumn";

// Temporary locall management

interface Column {
  id: number;
  name: string;
}

const columns: Column[] = [
  { id: 0, name: "Backlog" },
  { id: 1, name: "Assigned" },
  { id: 2, name: "In Progress" },
  { id: 3, name: "QA" },
  { id: 4, name: "Completed" },
];

interface Props {
  name: string;
  id: number;
}


const Board: React.FC<Props> = (props) => {
  const { tasksState, tasksDispatch } = useContext(TasksContext);

  const [taskForm, setTaskForm] = useState<boolean>(false);

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
    // here will be API call to update task
    tasksDispatch({ type: "TASK_UPDATE", taskID: taskID });
  };

  const openNewTaskFormHandler = () => setTaskForm(true)
  const closeNewTaskFormHandler = () => setTaskForm(false)

  let newTaskForm = taskForm ? <TaskForm board_id={props.id} formCloseHandler={closeNewTaskFormHandler} /> : null

  return (
    <div>
      <div id="BoardControls">
        <h1>{props.name}</h1>
        <button onClick={openNewTaskFormHandler}>Add Task</button>
        {newTaskForm}
      </div>
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
        />
      ))}
    </div>
  );
};

export default React.memo(
  Board,
  (oldProps, nextProps) => oldProps.id === nextProps.id
);
