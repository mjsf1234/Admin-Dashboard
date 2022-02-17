import "./Register.css";
import React, { useState, useEffect } from "react";
import axios from "./Axios";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const INIT_SESSION_DETAILS = {
  name: "Super admin",
  email: "superadmin@gmail.com",
  password: "admin@123",
  id: "",
  type: "super_admin",
};

const SuperRegister = () => {
  const history = useHistory();
  const [sessionDetails, setSessionDetails] = useState(INIT_SESSION_DETAILS);
  const [isValidName, setisValidName] = useState(true);
  const [isValidemail, setIsValidEmail] = useState(true);
  const [isValidPass, setIsValidPass] = useState(true);

  //FirstName verifying and Handling
  const nameChangeHandler = (e) => {
    if (sessionDetails.name.length > 0) {
      setisValidName(true);
    }
    setSessionDetails((prevState) => {
      return { ...prevState, name: e.target.value };
    });
  };

  //email verifying and Handling
  const emailChangeHandler = (e) => {
    if (sessionDetails.email.length > 0) {
      setIsValidEmail(true);
    }
    setSessionDetails((prevState) => {
      return { ...prevState, email: e.target.value };
    });
  };
  const passChangeHandler = (e) => {
    if (sessionDetails.password.length > 0) {
      setIsValidPass(true);
    }
    setSessionDetails((prevState) => {
      return { ...prevState, password: e.target.value };
    });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    // Validating inputs
    if (sessionDetails.name.length === 0) {
      setisValidName(false);
      return;
    }
    if (sessionDetails.email.length === 0) {
      setIsValidEmail(false);
      return;
    }
    if (sessionDetails.password.length < 6) {
      setIsValidPass(false);
      alert("enter 6 digit password");
      return;
    }
    const tempData = {
      ...sessionDetails,
      id: Math.random().toString(),
    };
    axios
      .post("/register", tempData)
      .then((res) => {
        alert(JSON.stringify(res.data.message));
        history.push("/superlogin");
      })
      .catch((e) => alert("user already exist"));

    setSessionDetails(INIT_SESSION_DETAILS);
  };

  return (
    <div className="form-main">
      <div className="form-title">
        <h2 style={{ color: "black", fontWeight: "bold" }}>
          Super Admin Register
        </h2>
      </div>
      <form onSubmit={submitFormHandler}>
        <input
          type="text"
          className={`form-field ${!isValidName ? "invalid" : ""}`}
          onChange={nameChangeHandler}
          placeholder="Enter Your Name"
          value={sessionDetails.name}
        ></input>
        <input
          type="email"
          className={`form-field ${!isValidemail ? "invalid" : ""}`}
          placeholder="Enter Your email"
          value={sessionDetails.email}
          onChange={emailChangeHandler}
        ></input>
        <input
          type="passsword"
          className={`form-field ${!isValidPass ? "invalid" : ""}`}
          placeholder="Enter Your Password"
          value={sessionDetails.password}
          onChange={passChangeHandler}
        ></input>

        <button type="submit" className="btn-submit">
          Register
        </button>
        <div>OR</div>
        <button
          type="submit"
          className="btn-submit"
          onClick={() => {
            history.push("/superlogin");
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};
export default SuperRegister;
