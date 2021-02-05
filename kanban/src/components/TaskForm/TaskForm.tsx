import axios from "../../axios-api";
import React, { useContext, useState } from "react";
import { TasksContext } from "../../context/tasks-context";

import "./TaskForm.css";

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
  const [error, setError] = useState<string>("")

  const addTaskHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if(taskForm.title.length < 1){
      setError("Title must not be empty")
      return
    }
    let data = {
      query: `mutation{add_task(title:"${taskForm.title}",description:"${taskForm.description}",severity:${taskForm.severity},column:0,board:${props.board_id}){id,title,description,severity,column}}`,
    };
    axios
      .post("/api", data)
      .then((resp) => {
        const respData = resp.data;
        if (respData.data.add_task !== null) {
          tasksDispatch({ type: "ADD_TASK", newTask: respData.data.add_task });
        }
      })
      .catch((err) => console.log(err));
    props.formCloseHandler();
  };

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    let newValue =
      field === "severity" ? +event.target.value : event.target.value;
    const newTaskForm = { ...taskForm, [field]: newValue };
    if (newTaskForm.title.length > 0 && error !== ""){
      setError("")
    }
    //   Might wanna validate inputs here
    setTaskForm(newTaskForm);
  };

  return (
    <div>
      <div className="Backdrop" onClick={props.formCloseHandler}></div>
      <div className="TaskFormWrapper">
        <div className="TaskForm">
          <h3>Create new task</h3>
          <div className="TaskCreationErrors">{error}</div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="TaskFormElement" id="TaskTitle">
              <input
                type="text"
                placeholder="Title"
                value={taskForm.title}
                onChange={(event) => inputChangeHandler(event, "title")}
              />
            </div>
            <div className="TaskFormElement">
              <textarea
                placeholder="Description"
                value={taskForm.description}
                onChange={(event) => inputChangeHandler(event, "description")}
              />
            </div>
            <div className="TaskFormElement">
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
            <button className="Confirm-btn" onClick={addTaskHandler}>Add task</button>
            <button className="Cancel-btn" onClick={props.formCloseHandler}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
