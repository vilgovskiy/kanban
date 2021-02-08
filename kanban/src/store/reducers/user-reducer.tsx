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

const initActiveBoard = {
  loaded: false,
  id: -1,
};

const initState = {
  loggedIn: false,
  username: "",
  userID: null,
  boards: [],
  activeBoard: initActiveBoard
};

const userReducer = (state: UserState, action: any) => {
  switch (action.type) {
    case "LOG_IN":
      let boards = action.user.boards.map((board: APIBoard) => ({
        id: board.id,
        name: board.name,
        isOwner: board.owner.id === action.user.id,
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
      let boardsUpdAdd = [...state.boards, action.board];
      return { ...state, boards: boardsUpdAdd, activeBoard: {loaded: true, id: boardsUpdAdd.length - 1} };
    case "DELETE_BOARD":
      let boardsUpdDel = state.boards.filter(board => board.id !== action.board_id)
      return {...state, boards: boardsUpdDel, activeBoard: initActiveBoard}
    case "SET_ACTIVE_BOARD":
      return {...state, activeBoard: { loaded: true, id: action.id}}
    default:
      return state;
  }
};

export default userReducer;
