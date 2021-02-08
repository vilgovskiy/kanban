import axios from "../../axios-api";
import React, { useEffect, useState } from "react";
import { MdClose, MdDelete, MdPersonAdd, MdRemoveCircleOutline } from "react-icons/md";

import "./AccessControl.css";

interface Props {
  board_id: number;
  user_id: number | null;
  closeHandler: () => void;
}

interface User {
  id: number;
  name: string;
}

const AccessControl = (props: Props) => {
  const [addUserNameState, setAddUserName] = useState<string>("");
  const [currentUsers, setCurrentUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`/api?query={users_on_board(board_id: ${props.board_id}){id,name}}`)
      .then((resp) => {
        const respData = resp.data;
        if (respData.data.users_on_board != null) {
          setCurrentUsers(
            respData.data.users_on_board.filter(
              (user: User) => user.id !== props.user_id
            )
          );
        } else if (respData.errors) {
          setError(respData.errors[0].message);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Something went horribly wrong!");
      });
  }, [props.board_id, props.user_id]);

  const addUserToBoardHandler = () => {
    if (addUserNameState.length < 1) {
      setError("Username can not be empty");
      return;
    }
    const data = {
      query: `mutation{add_user_to_board(board:${props.board_id},user:"${addUserNameState}"){id,name}}`,
    };
    axios
      .post("/api", data)
      .then((resp) => {
        const respData = resp.data;
        if (respData.data.add_user_to_board != null) {
          setCurrentUsers([...currentUsers, respData.data.add_user_to_board]);
          setError(null);
        } else if (respData.errors) {
          setError(respData.errors[0].message);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Something went horribly wrong");
      });
  };

  const removeUserFromBoardHandler = (user_id: number) => {
    const data = {
      query: `mutation{remove_user_from_board(user_id:${user_id},board_id:${props.board_id}){id}}`,
    };
    axios
      .post("/api", data)
      .then((resp) => {
        const respData = resp.data;
        if (
          respData.data.remove_user_from_board !== null &&
          respData.data.remove_user_from_board.id === user_id
        ) {
          setCurrentUsers(currentUsers.filter((user) => user.id !== user_id));
        } else if (respData.errors) {
          setError(respData.errors[0].message);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Something went horribly wrong!");
      });
  };

  const userNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value.length > 0) {
      setError(null);
    }
    setAddUserName(e.target.value);
  };
  return (
    <React.Fragment>
      <div className="Backdrop" onClick={props.closeHandler} />
      <div className="AccessControl">
        <h3>Access Control</h3>
        <div className="CloseIcon" onClick={props.closeHandler}>
          <MdClose size={30} />
        </div>
        {error ? <div className="Errors">{error}</div> : null}
        <div className="GeneralInput">
          <label>Add user</label>
          <input
            type="text"
            value={addUserNameState}
            placeholder="Username(case sensitive)"
            onChange={userNameChangeHandler}
          />
          <button
            // className="General-btn Confirm-btn"
            onClick={addUserToBoardHandler}
          >
            <MdPersonAdd size={30} />
          </button>
        </div>
        <h5>Users have access to this board:</h5>
        <div className="CurrentUsers">
          {currentUsers.map((user) => (
            <div className="CurrentUser" key={user.id}>
              {user.name}
              <button onClick={() => removeUserFromBoardHandler(user.id)}>
                <MdRemoveCircleOutline size={25} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AccessControl;
