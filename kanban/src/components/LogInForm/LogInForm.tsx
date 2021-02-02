import axios from "../../axios-api";
import React, { useContext, useState } from "react";
import Spinner from "../UI/Spinner/Spinner";
import { UserContext } from "../../context/user-context";

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
          console.log("Setting error");
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
    let data = {
      query: `mutation{add_user(name:"${logInForm.username}",password:"${logInForm.password}"){id,name}}`,
    };
    axios
      .post("/api", data)
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="LogInErrors">
        {error !== null ? <p>{error}</p> : null}
      </div>
      <form onSubmit={logInHandler}>
        <label>Username</label>
        <input
          type="text"
          placeholder="username"
          value={logInForm.username}
          onChange={(e) => inputChangeHandler(e, "username")}
        />
        <label>Password</label>
        <input
          type="text"
          placeholder="password"
          value={logInForm.password}
          onChange={(e) => inputChangeHandler(e, "password")}
        />
        <button>Log in</button>
      </form>
      <button onClick={signupHandler}>Sign up</button>
      {loading ? <Spinner /> : null}
    </div>
  );
};

export default LogInForm;
