import React, { useState } from "react";
import API_URL from "../api";
import axios from "axios";

export default function InputForm({ setIsOpen }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let endpoint = isSignUp ? "signUp" : "login";

    try {
      const res = await axios.post(`${API_URL}/${endpoint}`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setIsOpen(false);
    } catch (error) {
      setError(error.response?.data?.error);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleOnSubmit}>
        <div className="form-control">
          <label>Email</label>
          <input
            type="email"
            className="input"
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </div>
        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>{" "}
        <br></br>
        {error && <h6 className="error">{error}</h6>}
        <br></br>
        <p onClick={() => setIsSignUp((prev) => !prev)}>
          {isSignUp ? "Already have an account" : "Create New Account"}
        </p>
      </form>
    </>
  );
}
