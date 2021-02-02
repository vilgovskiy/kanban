interface Board {
  id: number;
  name: string;
  isOwner: boolean;
}

interface APIBoard {
  id: number;
  name: string;
  owner: {
    id: number
  }
}

interface UserState {
  loggedIn: boolean;
  username: string;
  userID: number | null;
  boards: [Board] | null;
}

const initState = {
  loggedIn: false,
  username: "",
  userID: null,
  boards: null,
};

const userReducer = (state: UserState, action: any) => {
  switch (action.type) {
    case "LOG_IN":
      let boards = action.user.boards.map((board: APIBoard) => ({
        id: board.id,
        name: board.name,
        isOwner: board.owner.id === board.id
      }));
      return {loggedIn: true, userID: action.user.id, username: action.user.name, boards: boards};
    case "LOG_OUT":
      return initState;
    default:
      return state;
  }
};

export default userReducer;
