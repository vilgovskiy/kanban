import axios from "../../axios-api";
import React, { useState } from "react";

interface FormState {
  username: string;
  password: string;
}

const initState = {
  username: "",
  password: "",
};
const LogInForm: React.FC = () => {
  const [logInForm, setLogInForm] = useState<FormState>(initState);

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
    axios
      .get(
        `/api?query={auth(name:"${logInForm.username}",password:"${logInForm.password}"){id,name,boards{id,name,owner{id}}}}`
      )
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signupHandler = () => {
    let data = {"query": `mutation{add_user(name:"${logInForm.username}",password:"${logInForm.password}"){id,name}}`};
    axios.post("/api", data)
    .then(resp => console.log(resp))
    .catch(err => console.log(err));
  };

  return (
    <div>
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
    </div>
  );
};

export default LogInForm;
