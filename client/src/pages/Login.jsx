import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();
  const { dispatchAuth } = useContext(AuthContext);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = {
      username: username,
      password: password,
    };

    try {
      await axios
        .post("http://localhost:8800/login", userData)
        .then((res) => {
          // Handle successful login
          let adminData = {
            username: userData.username,
            roles: "Admin",
          };
          setErrors("");
          dispatchAuth({ type: "LOGIN", payload: adminData });
          navigate("/visitorlist");
        })
        .catch((err) => {
            console.log(err)
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="LoginContainer">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label>Username: </label>
            <input
              type="text"
              id="username"
              placeholder="Username..."
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="input-container">
            <label>Password: </label>
            <input
              type="password"
              id="password"
              placeholder="Password..."
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {errors && (
              <span className="error">"Wrong Email or Password!"</span>
            )}
          </div>
          <button className="LoginButton">
            <p>Login</p>
          </button>
        </form>

        <div className="div">
          <Link to="/">
            <div className="linkToLogin">Check-In</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
