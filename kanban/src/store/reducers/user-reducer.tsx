interface Board {
  id: number;
  name: string;
  isOwner: boolean;
}

interface APIBoard {
  id: number;
  name: string;
  owner: {
    id: number;
  };
}

interface UserState {
  loggedIn: boolean;
  username: string;
  userID: number | null;
  boards: Board[];
  activeBoard: {
    loaded: boolean;
    id: number;
  };
}

const initState = {
  loggedIn: false,
  username: "",
  userID: null,
  boards: [],
  activeBoard: {
    loaded: false,
    id: -1,
  },
};

const userReducer = (state: UserState, action: any) => {
  switch (action.type) {
    case "LOG_IN":
      let boards = action.user.boards.map((board: APIBoard) => ({
        id: board.id,
        name: board.name,
        isOwner: board.owner.id === board.id,
      }));
      return {
        ...state,
        loggedIn: true,
        userID: action.user.id,
        username: action.user.name,
        boards: boards,
      };
    case "LOG_OUT":
      return initState;
    case "ADD_BOARD":
      const boardsUpd = [...state.boards, action.board];
      return { ...state, boards: boardsUpd, activeBoard: {loaded: true, id: boardsUpd.length - 1} };
    case "SET_ACTIVE_BOARD":
      return {...state, activeBoard: { loaded: true, id: action.id}}
    default:
      return state;
  }
};

export default userReducer;
