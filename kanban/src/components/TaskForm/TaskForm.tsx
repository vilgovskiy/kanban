import axios from "../../axios-api";
import React, { useContext, useState } from "react";
import { TasksContext } from "../../context/tasks-context";

interface TaskFormType {
  title: string;
  description: string;
  severity: number;
}

interface Props {
  board_id: number;
  formCloseHandler: () => void;
}

const initFormState = {
  title: "",
  description: "",
  severity: 0,
};

const TaskForm = (props: Props) => {
  const { tasksDispatch } = useContext(TasksContext);
  const [taskForm, setTaskForm] = useState<TaskFormType>(initFormState);

  const addTaskHandler = (event: React.FormEvent) => {
    event.preventDefault();
    let data = {
      query: `mutation{add_task(title:"${taskForm.title}",description:"${taskForm.description}",severity:${taskForm.severity},column:0,board:${props.board_id}){id,title,description,severity,column}}`,
    };
    axios.post("/api", data)
    .then(resp => {
      const respData = resp.data
      if (respData.data.add_task !== null) {
        tasksDispatch({type: "ADD_TASK", newTask: respData.data.add_task})
      }
    })
    .catch(err => console.log(err));
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
            placeholder="Title"
            value={taskForm.title}
            onChange={(event) => inputChangeHandler(event, "title")}
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
