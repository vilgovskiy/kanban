import React from 'react';
import "./KanBanCard.css"

interface Task {
    id: number;
    name: string;
    description: string;
    severity: number;
    column: number;
}

interface Props {
    task: Task
    onDragEnd: (event: React.DragEvent<HTMLDivElement>, taskID: number) => void;
}

const KanBanCard = (props:Props) => {

    return <div className="KanBanCard" draggable={true} onDragEnd={e => props.onDragEnd(e, props.task.id)}>
        <div><h4>{props.task.name}</h4></div>
        <div>{props.task.description}</div>
    </div>
}

export default KanBanCard