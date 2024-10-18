import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/features/slice";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const error = useSelector((state) => state.counter.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.counter.token);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault(); // type button a sa place
    dispatch(
      login({
        username: username,
        password: password,
      })
    );
  };

  useEffect(() => {
    if (token) {
      navigate("/user");
    }
  },[token,navigate]);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {error && <span>{error}</span>}
          <button
            type="button"
            className="sign-in-button"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
