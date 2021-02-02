import React, { useContext } from "react";
import "./App.css";
import KanBan from "./components/Board/KanBan";
import LogInForm from "./components/LogInForm/LogInForm";
import TasksContextProvider from "./context/tasks-context";
import {UserContext} from "./context/user-context";

const App: React.FC = () => {
  const { userState } = useContext(UserContext)

  const display = userState.loggedIn ? <KanBan /> : <LogInForm />
  
  return (
      <TasksContextProvider>
        <div className="App">
          {display}
        </div>
      </TasksContextProvider>
  );
};

export default App;
