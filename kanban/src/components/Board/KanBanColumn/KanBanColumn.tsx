import React from "react";
import KanBanCard from "../KanBanCard/KanBanCard";
import "./KanBanColumn.css";

interface Task {
  id: number;
  title: string;
  description: string;
  severity: number;
  column: number;
}

interface Props {
  name: string;
  columnId: number;
  tasks: Task[];
  onDragEnter: (
    event: React.DragEvent<HTMLDivElement>,
    columnID: number
  ) => void;
  onDragEnd: (event: React.DragEvent<HTMLDivElement>, taskID: number) => void;
  onTaskDelete: (task_id: number) => void
}

const KanbanColumn = (props: Props) => {
  return (
    <div
      className="KanBanColumn"
      onDragEnter={(e) => props.onDragEnter(e, props.columnId)}
    >
      <h3>{props.name}</h3>
      <div className="TasksSection">
        {props.tasks.map((task) => (
          <KanBanCard key={task.id} task={task} onDragEnd={props.onDragEnd} onTaskDelete={props.onTaskDelete} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
