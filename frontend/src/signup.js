import './signup.css';

import { useNavigate, Link } from 'react-router-dom';
import React, { useState } from "react";
import axios from "axios";
import {useCookies} from 'react-cookie'




// const img = require("./planitpro_logo.png");





const Signup = (props) => {
  const navigate = useNavigate();
  const [, setCookies] = useCookies('access_token');
  // const [imageUrl, setImageUrl] = useState("");

  const handleClick = async (username, name, password, password2,) => {
    console.log("The form was submitted with the following data:");
    console.log({ username, name, password, password2});

    const formData = new FormData();
    // formData.append("file", pic);
    formData.append("upload_preset", "et2wvsbo");

    // const response= await axios.post('https://api.cloudinary.com/v1_1/dgbg003qn/image/upload', formData)
    

    

    // const url =  response.data.secure_url;
    
    // console.log(url)


    function isValidUsername(username) {
      if (username.length < 5) {
        return false;
      }
      
      if (!/\d/.test(username)) {
        return false;
      }
      
      return true;
    }
    
    function isValidPassword(password) {
      if (password.length < 5) {
        return false;
      }
      return true; 
    }

  

    // Check if the username already exists

    
    try {

      if (isValidUsername(username) === false){
        alert("Username needs to have minimum 5 characters and atleast 1 number");
        console.log("Username error")
        return;
      }

      if (isValidPassword(password) === false){
        alert("Password needs to have minimum 5 characters");
        console.log("Password error")
        return;
      }
      const response = await axios.post("https://ai-tts-generator-2.onrender.com/signup", { username, name, password });
      if (response.data.message === "Success") {
        alert("User Created");
        navigate("/login")
        return;
      }
      else{
        alert("User exists");
      }
    } catch (error) {
      console.log("An error occurred while checking the username");
      alert("An error occurred. Please try again later.");
      return;
    }

    // Check if the password and password2 match
    if (password !== password2) {
      alert("Passwords do not match");
      return;
    }

    // Continue with signup process
    try {
      const response = await axios.post("https://ai-tts-generator-2.onrender.com/signup", { username, password });
      setCookies(response.data.token);
      window.localStorage.setItem("User_ID", response.data.userID);
      console.log(response.data.userID);
      console.log(response.data.message);
      navigate("/login");
    } catch (error) {
      console.log("An error occurred while signing up");
      alert("An error occurred. Please try again later.");
    }
  };



  return (

        <body class = "su-body">
        <div class="split-left">
          <img src="/hero.gif" className="ml-12 rounded-2xl" alt="" srcset="" />
        </div>

        <div class="split-right">
          <div id="signupform">
            <br></br> 
            <FormHeader title="CREATE ACCOUNT" />
            <Form onClick={handleClick}/>
          </div>
        </div>
                
        </body>

); 
}

export default Signup;       


const FormHeader = props => (
    <h1 id="signup-headerTitle">{props.title}</h1>
);


const Form = (props) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  // const [pic, setPic] = useState("");


  // const handleFileInputChange = async event => {
  //   setPic(event.target.files[0]);
  // }
    

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
  };

  return (
   <span>
     <FormInput description="Username" placeholder="Enter your username" type="text" value={username} onChange={handleUsernameChange}/>
     <FormInput description="Name" placeholder="Enter your name" type="text"  value={name} onChange={handleNameChange}/>
     <FormInput description="Password" placeholder="Enter your password" type="password"  value={password} onChange={handlePasswordChange}/>
     <FormInput description="Re-Enter Password" placeholder="Re-enter your password" type="password"  value={password2} onChange={handlePassword2Change}/>
     {/* <FormInputFile description="Profile Picture" onChange={handleFileInputChange} /> */}
     <FormButton title="Sign Up" onClick={() => props.onClick(username, name, password, password2)}/>
     <p>
          {" "}
          Already have an account? <Link to="/login">Login instead</Link>
      </p>
   </span>
  );
  };

const FormButton = props => (
  <div id="button" class="row">
    <button onClick={props.onClick}> {props.title}</button>
  </div>
);

const FormInput = props => (
  <div class="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange}/>
  </div>  
);
// const FormInputFile = props => (
//   <div class="row">
//     <label>{props.description}</label>
//     <input type="file" onChange={props.onChange} />
//     {/* <button onClick={() => document.querySelector('input[type="file"]').click()}>Upload</button> */}
//   </div>  
// );
