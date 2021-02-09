interface Task {
  id: number;
  title: string;
  description: string;
  severity: number;
  column: number;
}

interface State {
  loading: boolean;
  dragOverColumn: number;
  tasks: { [id: number]: Task };
}

const tasksReducer = (state: State, action: any) => {
  switch (action.type) {
    case "DRAG_UPDATE":
      return { ...state, dragOverColumn: action.column };
    case "TASK_UPDATE":
      const taskToUPD = Object.values(state.tasks).filter(
        (task) => task.id === action.taskID
      )[0];
      taskToUPD.column = state.dragOverColumn;
      const tasksUPD = { ...state.tasks, [taskToUPD.id]: taskToUPD };
      return { ...state, tasks: tasksUPD };
    case "TASKS_FETCH_START":
      return { ...state, loading: true };
    case "TASKS_FETCH":
      return { ...state, tasks: action.tasks, loading: false };
    case "ADD_TASK":
      return {
        ...state,
        tasks: { ...state.tasks, [action.newTask.id]: action.newTask },
      };
    case "EDIT_TASK":
      const tasksEdit ={...state.tasks}
      tasksEdit[action.updatedTask.id] = action.updatedTask;
      return {...state, tasks: tasksEdit} 
    case "DELETE_TASK":
      const tasksUpd = {...state.tasks};
      delete tasksUpd[action.task_id];
      return {...state, tasks: tasksUpd}
    default:
      return state;
  }
};

export default tasksReducer;
