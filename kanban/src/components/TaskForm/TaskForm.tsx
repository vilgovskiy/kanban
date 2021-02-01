import React, { useContext, useState } from "react";
import { TasksContext } from "../../context/tasks-context";

interface TaskFormType {
  name: string;
  description: string;
  severity: number;
}

interface Props {
  formCloseHandler: () => void;
}

const initFormState = {
  name: "",
  description: "",
  severity: 0,
};

const TaskForm = (props: Props) => {
  const { tasksDispatch } = useContext(TasksContext);
  const [taskForm, setTaskForm] = useState<TaskFormType>(initFormState);

  const addTaskHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // Temporary solution until connect to backend
    let newID = Math.random() * 10000;
    let newTask = { ...taskForm, id: newID, column: 0 };
    tasksDispatch({ type: "ADD_TASK", newTask: newTask });
    props.formCloseHandler();
  };

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    field: string
  ) => {
    let newValue =
      field === "severity" ? +event.target.value : event.target.value;
    const newTaskForm = { ...taskForm, [field]: newValue };
    //   Might wanna validate inputs here
    setTaskForm(newTaskForm);
  };

  return (
    <div>
    <form onSubmit={addTaskHandler}>
      <div className="InputElement">
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          value={taskForm.name}
          onChange={(event) => inputChangeHandler(event, "name")}
        />
      </div>
      <div className="InputElement">
        <label>Description</label>
        <input
          type="text"
          placeholder="Description"
          value={taskForm.description}
          onChange={(event) => inputChangeHandler(event, "description")}
        />
      </div>
      <div className="InputElement">
        <label>Severity</label>
        <select
          value={taskForm.severity}
          onChange={(event) => inputChangeHandler(event, "severity")}
        >
          <option key={0} value={0}>
            Low
          </option>
          <option key={1} value={1}>
            Medium
          </option>
          <option key={2} value={2}>
            High
          </option>
          <option key={3} value={3}>
            Extreme
          </option>
        </select>
      </div>
      <button>Add task</button>
    </form>
    <button onClick={props.formCloseHandler}>Close</button>
    </div>
  );
};

export default TaskForm;
