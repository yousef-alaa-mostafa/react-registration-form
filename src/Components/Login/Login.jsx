import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

//used styles
import RegStyle from "../Register/Register.module.css";

function Login() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSucuss] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd);
    setUser("");
    setPwd("");
    window.open("./", "_self");
  };

  return (
    <section>
      <p ref={errRef} className={errMsg ? RegStyle.errMsg : RegStyle.offscreen}>
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={HandleSubmit}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        ></input>
        <laber htmlFor="password">Password:</laber>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        ></input>
        <button>Sign In</button>
      </form>
      <p>
        Need an Account?
        <br />
        <span className="line">
          <Link to="/Register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
}

export default Login;
