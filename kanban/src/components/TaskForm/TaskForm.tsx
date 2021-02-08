import axios from "../../axios-api";
import React, { useContext, useEffect, useState } from "react";
import { TasksContext } from "../../context/tasks-context";

import "./TaskForm.css";

interface TaskFormType {
  title: string;
  description: string;
  severity: number;
}

interface Task {
  id: number;
  title: string;
  description: string;
  severity: number;
  column: number;
}

interface Props {
  board_id?: number;
  type: string;
  task?: Task;
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
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (props.type !== "CREATE" && props.task) {
      setTaskForm({
        title: props.task.title,
        description: props.task.description,
        severity: props.task.severity,
      });
    }
  }, [props.type, props.task]);

  const addTaskHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (taskForm.title.length < 1) {
      setError("Title must not be empty");
      return;
    }
    let data = {
      query: `mutation{add_task(title:"${
        taskForm.title
      }",description:"${encodeURIComponent(taskForm.description)}",severity:${
        taskForm.severity
      },column:0,board:${
        props.board_id
      }){id,title,description,severity,column}}`,
    };
    console.log(data.query);
    axios
      .post("/api", data)
      .then((resp) => {
        const respData = resp.data;
        if (respData.data.add_task !== null) {
          const newTask = {
            ...respData.data.add_task,
            description: decodeURIComponent(respData.data.add_task.description),
          };
          tasksDispatch({ type: "ADD_TASK", newTask: newTask });
        }
      })
      .catch((err) => console.log(err));
    props.formCloseHandler();
  };

  const updateTaskHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (taskForm.title.length < 1) {
      setError("Title must not be empty");
      return;
    }
    let data = {
      query: `mutation{update_task(id:${props.task?.id},title:"${
        taskForm.title
      }",description:"${encodeURIComponent(taskForm.description)}",severity:${
        taskForm.severity
      }){id,title,description,severity,column}}`,
    };
    console.log(data.query);
    axios
      .post("/api", data)
      .then((resp) => {
        const respData = resp.data;
        if (
          respData.data.update_task !== null &&
          respData.data.update_task.id === props.task?.id
        ) {
          const updatedTask = {
            ...respData.data.update_task,
            description: decodeURIComponent(
              respData.data.update_task.description
            ),
          };
          tasksDispatch({ type: "EDIT_TASK", updatedTask: updatedTask });
        } else if (respData.errors) {
          console.log(respData.errors);
        }
      })
      .catch((err) => console.log(err));
    props.formCloseHandler();
  };

  const inputChangeHandler = (
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >,
    field: string
  ) => {
    let newValue =
      field === "severity" ? +event.target.value : event.target.value;
    const newTaskForm = { ...taskForm, [field]: newValue };
    if (newTaskForm.title.length > 0 && error !== "") {
      setError("");
    }
    //   Might wanna validate inputs here
    setTaskForm(newTaskForm);
  };

  return (
    <div>
      <div className="Backdrop" onClick={props.formCloseHandler}></div>
      <div className="TaskFormWrapper">
        <div className="TaskForm">
          {props.type === "CREATE" ? <h3>Create new task</h3>: <h3>Edit task</h3>}
          <div className="Errors">{error}</div>
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
            <button className="General-btn Confirm-btn" onClick={props.type === "CREATE" ? addTaskHandler : updateTaskHandler}>
              Accept
            </button>
            <button className="General-btn Cancel-btn" onClick={props.formCloseHandler}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
