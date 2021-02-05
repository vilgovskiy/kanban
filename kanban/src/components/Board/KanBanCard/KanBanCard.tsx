import React, { useState } from "react";
import "./KanBanCard.css";
import { MdEdit, MdDelete } from "react-icons/md";
import TaskForm from "../../TaskForm/TaskForm";

interface Task {
  id: number;
  title: string;
  description: string;
  severity: number;
  column: number;
}

interface Props {
  task: Task;
  onDragEnd: (event: React.DragEvent<HTMLDivElement>, taskID: number) => void;
  onTaskDelete: (task_id: number) => void;
}

const KanBanCard = (props: Props) => {
  const [expandState, setExpand] = useState<boolean>(false);
  const [editFormActive, setEditFormActive] = useState<boolean>(false)

  const expandHandler = () => setExpand(!expandState);

  let displayDescription = <p>{props.task.description}</p>;
  if (props.task.description.length > 60 && !expandState) {
    displayDescription = (
      <p className="Expandable">
        {props.task.description.substring(0, 60)}
        <span>...</span>
      </p>
    );
  }

  const handleOpenEditForm = () => setEditFormActive(true)
  const handleCloseEditForm = () => setEditFormActive(false)

  const editFormComponent = editFormActive ? <TaskForm type="EDIT" task={props.task} formCloseHandler={handleCloseEditForm} /> : null
  return (
    <div
      className="KanBanCard"
      draggable={true}
      onDragEnd={(e) => props.onDragEnd(e, props.task.id)}
    >
      <div className="CardTitle">
        {editFormComponent}
        <h4>{props.task.title}</h4>
        <div className="CardChangeIcons" onClick={()=>props.onTaskDelete(props.task.id)}>
          <MdDelete size={20} />
        </div>
        <div className="CardChangeIcons" onClick={handleOpenEditForm}>
          <MdEdit size={20}/>
        </div>
      </div>
      {props.task.description.length > 0 ? (
        <div className="CardDescription" onClick={expandHandler}>
          {displayDescription}
        </div>
      ) : null}
    </div>
  );
};

export default KanBanCard;
