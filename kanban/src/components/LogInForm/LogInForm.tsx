import axios from "../../axios-api";
import React, { useContext, useState } from "react";
import Spinner from "../UI/Spinner/Spinner";
import { UserContext } from "../../context/user-context";

import "./LogInForm.css";

interface FormState {
  username: string;
  password: string;
}

interface Errors {
  [label: string]: string;
}

const initState = {
  username: "",
  password: "",
};

const LogInForm: React.FC = () => {
  const { userDispatch } = useContext(UserContext);
  const [logInForm, setLogInForm] = useState<FormState>(initState);
  const [errors, setErrors] = useState<Errors | null>(null);
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

  const validateForm = (mode: string) => {
    let newErrors: Errors = {};
    if (logInForm.username.length < 1) {
      newErrors["username"] = "Username can not be empty";
    }
    if (logInForm.username.includes(' ')){
      newErrors["username"] = "Username can not contain spaces";
    }
    if (mode === "SIGNUP" && logInForm.password.length < 6) {
      newErrors["password"] = "Password must be at least 6 characters long.";
    } else if (logInForm.password.length < 1) {
      newErrors["password"] = "Password can not be empty.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const logInHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm("LOGIN")) {
      return;
    }
    setLoading(true);
    axios
      .get(
        `/api?query={auth(name:"${logInForm.username}",password:"${logInForm.password}"){id,name,boards{id,name,,owner{id}}}}`
      )
      .then((resp) => {
        const respData = resp.data;
        if (respData.data.auth !== null) {
          userDispatch({ type: "LOG_IN", user: respData.data.auth });
          // Nothing needs to be done after this despatch as component will unmount.
        } else {
          setMessage(null);
          let errToSet = "Could not log in, please check you username/password";
          if (respData.errors) {
            errToSet = respData.errors.join("; ");
          }
          setErrors({
            LOGIN: errToSet,
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrors({ LOGIN: "Opps something went terribly wrong!" });
        setLoading(false);
      });
  };

  const signupHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm("SIGNUP")) {
      return;
    }
    setLoading(true);
    const data = {
      query: `mutation{add_user(name:"${logInForm.username}",password:"${logInForm.password}"){id,name}}`,
    };
    axios
      .post("/api", data)
      .then((resp) => {
        const respData = resp.data;
        if (respData.data.add_user !== null) {
          setErrors(null);
          setMessage(
            `Successfully created user ${respData.data.add_user.name}. Now you can log in with this username: `
          );
        } else if (respData.errors) {
          let errorMsg = ""
          if (respData.errors[0].message.includes("duplicate key value")){
            errorMsg = ": User with such name already exists" 
          }
          setErrors({
            SIGNUP: `Could not create user ${
              logInForm.username
            }${errorMsg}`,
          });
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
      <div className="Errors">
        {errors !== null
          ? Object.keys(errors).map((errorKey) => <p key={errorKey}>{errors[errorKey]}</p>)
          : null}
      </div>
      <div className="LogInMessages">
        {message !== null ? <p>{message}</p> : null}
      </div>
      {loading ? <Spinner /> : null}
      <form>
        <div className="LogInFormGroup">
          <input
            className={errors && errors.username ? "NeedFixing" : ""}
            type="text"
            id="username"
            placeholder="Username"
            value={logInForm.username}
            onChange={(e) => inputChangeHandler(e, "username")}
            required
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="LogInFormGroup">
          <input
            className={errors && errors.password ? "NeedFixing" : ""}
            type="password"
            id="password"
            placeholder="Password"
            value={logInForm.password}
            onChange={(e) => inputChangeHandler(e, "password")}
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <button onClick={logInHandler}>Log in</button>
        <button onClick={signupHandler}>Sign up</button>
      </form>
    </div>
  );
};

export default LogInForm;
