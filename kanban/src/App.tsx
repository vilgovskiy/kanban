import React from "react";
import "./App.css";
import KanBan from "./components/Board/KanBan";
import TasksContextProvider from "./context/tasks-context";

const App: React.FC = () => {
  return (
    <TasksContextProvider>
      <div className="App">
        <KanBan />
      </div>
    </TasksContextProvider>
  );
};

export default App;
