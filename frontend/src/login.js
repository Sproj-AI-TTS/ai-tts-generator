import "./login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import {useCookies} from 'react-cookie'

const img = require("./planitpro_logo.png");

const Login = (props) => {

  // Connecting the Login button with the backend


  const navigate = useNavigate();
  const [,setCookies]=useCookies('access_token')

  const handleClick = async (username, password) => {
    console.log("The form was submitted with the following data:");
    console.log({ username, password });

    if(username === "Admin"){
      console.log("Admin is");
      navigate("/home");
    }

    try {
      const response=await axios.post("/login", { username, password });
     
      setCookies(response.data.token);
      window.localStorage.setItem("User_ID", response.data.userID);

      console.log(response.data.message);

      if(username === "Admin"){
        console.log("Admin is");
        navigate("/home");
      }

      else if(response.data.message !== "invalid"){
        navigate("/home", { state: {username} });
      }
      else{
        alert("invalid Credentials, Please try again later")
      }
      
    } catch (error) {
      console.log("An error occurred");
    }
  };

  return (
    <>
    <head>
    <link rel="icon" href={img} />
    </head>
    <body class="li-body">
      <div id="loginform">
        <br></br>
        <img src={img} alt="PlanIt Pro logo" />
        <FormHeader title="AI Text-to-Speech Generator" />
        <Form onClick={handleClick} />
        {/* <OtherMethods /> */}
        <p> Forgot Password?</p>
        <p>
          {" "}
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </body>
    </>
  );
};

export default Login;

const FormHeader = (props) => <h1 id="login-headerTitle">{props.title}</h1>;

const Form = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <span>
      <FormInput
        description="Username"
        placeholder="Enter your username"
        type="text"
        value={username}
        onChange={handleUsernameChange}
      />
      <FormInput
        description="Password"
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <FormButton
        title="Log in"
        onClick={() => props.onClick(username, password)}
      />
    </span>
  );
};

const FormButton = (props) => (
  <div id="button" class="row">
    <button onClick={props.onClick}>{props.title}</button>
  </div>
);

const FormInput = (props) => (
  <div class="row">
    <label> {props.description}</label>
    <input type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange}/>
  </div>
);