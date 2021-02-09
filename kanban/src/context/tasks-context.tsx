import React, { useReducer } from "react";
import tasksReducer from "../reducers/tasks-reducer";

const initState = {
  loading: false,
  dragOverColumn: -1,
  tasks: {
    0: {
      id: 0,
      title: "task0",
      description: "Task 0",
      severity: 0,
      column: 1,
    },
    1: {
      id: 1,
      title: "task1",
      description: "Task 1",
      severity: 0,
      column: 0,
    },
    2: {
      id: 2,
      title: "task2",
      description: "Task 2",
      severity: 0,
      column: 1,
    },
    3: {
      id: 3,
      title: "task3",
      description: "Task 3",
      severity: 0,
      column: 3,
    },
  },
};

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

export const TasksContext = React.createContext<{
  tasksState: State;
  tasksDispatch: React.Dispatch<any>;
}>({ tasksState: initState, tasksDispatch: () => null });

const TasksContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initState);

  return (
    <TasksContext.Provider
      value={{ tasksState: state, tasksDispatch: dispatch }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;
