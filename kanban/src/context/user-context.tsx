import React, {useReducer} from "react";
import userReducer from "../reducers/user-reducer";

interface Board {
  id: number;
  name: string;
  isOwner: boolean;
}

interface UserState {
  loggedIn: boolean;
  username: string;
  userID: number | null;
  boards: Board[];
  activeBoard: {
    loaded: boolean;
    id: number;
  }
}

const initState = {
  loggedIn: false,
  username: "",
  userID: null,
  boards: [],
  activeBoard: {
    loaded: false,
    id: -1
  }
};

export const UserContext = React.createContext<{
  userState: UserState;
  userDispatch: React.Dispatch<any>;
}>({
  userState: initState,
  userDispatch: () => null,
});

const UserContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initState);

  return (
    <UserContext.Provider
      value={{ userState: state, userDispatch: dispatch }}
    >
      {children}
    </UserContext.Provider>
  );
};


export default UserContextProvider;
