import axios from "../../axios-api";
import React, { useContext, useState } from "react";
import Spinner from "../UI/Spinner/Spinner";
import { UserContext } from "../../context/user-context";

import "./LogInForm.css";

interface FormState {
  username: string;
  password: string;
}

const initState = {
  username: "",
  password: "",
};

const LogInForm: React.FC = () => {
  const { userDispatch } = useContext(UserContext);
  const [logInForm, setLogInForm] = useState<FormState>(initState);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    field: string
  ) => {
    const newLogInForm = { ...logInForm, [field]: event.target.value };
    //   Might wanna validate inputs here
    setLogInForm(newLogInForm);
  };

  const logInHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    axios
      .get(
        `/api?query={auth(name:"${logInForm.username}",password:"${logInForm.password}"){id,name,boards{id,name,,owner{id}}}}`
      )
      .then((resp) => {
        const respData = resp.data.data;
        if (respData.auth !== null) {
          userDispatch({ type: "LOG_IN", user: respData.auth });
        } else {
          setMessage(null);
          setError("Could not log in, please check you username/password");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const signupHandler = () => {
    setLoading(true);
    const data = {
      query: `mutation{add_user(name:"${logInForm.username}",password:"${logInForm.password}"){id,name}}`,
    };
    axios
      .post("/api", data)
      .then((resp) => {
        const respData = resp.data;
        if (respData.data.add_user !== null) {
          setError(null);
          setMessage(
            `Successfully created user ${respData.data.add_user.name}. Now you can log in with this username: `
          );
        } else if (respData.errors) {
          setError(`Could not create user ${logInForm.username}`);
          setMessage(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="LogInForm">
      <h2>Hello User! </h2>
      <h3>Please sign in to view boards!</h3>
      <div className="LogInErrors">
        {error !== null ? <p>{error}</p> : null}
      </div>
      <div className="LogInMessages">
        {message !== null ? <p>{message}</p> : null}
      </div>
      <form>
        <div className="LogInFormGroup">
          <input
            type="text"
            //placeholder="Username"
            value={logInForm.username}
            onChange={(e) => inputChangeHandler(e, "username")}
            required
          />
          <label>Username</label>
        </div>
        <div className="LogInFormGroup">
          <input
            type="text"
            //placeholder="Password"
            value={logInForm.password}
            onChange={(e) => inputChangeHandler(e, "password")}
            required
          />
          <label>Password</label>
        </div>
        <button onClick={logInHandler}>Log in</button>
        <button onClick={signupHandler}>Sign up</button>
      </form>

      {loading ? <Spinner /> : null}
    </div>
  );
};

export default LogInForm;
