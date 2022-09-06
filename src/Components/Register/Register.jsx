import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// import fontawesome
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import used styles
import regStyle from "./Register.module.css";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/; // to validate the user name
// starts with lower case or upper case letter
// followed by 3 to 23 letters
// upper case or lower case letters or - or _

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // to validate the password
//atlest one lowercase letter and one uppercase letter one digit(0:9) and one special character

////////////////////////////////////////////    main function    //////////////////////////////////////////////////
function Register() {
  //define vars
  const userRef = useRef(); // Allow us to set the focus on the user input when the conponent loads.
  const errRef = useRef(); // Because if we get an error we need to put the focus on that so it can be announced by a screen reader for accessability.

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false); // is name valid or not
  const [userFocus, setUserFocus] = useState(false); // do we have focus on user input field or not

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false); // is password valid or not
  const [PwdFocus, setPwdFocus] = useState(false); // do we have focus on password input field or not

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false); // is match password = password or not
  const [matchFocus, setMatchFocus] = useState(false); // do we have focus on match password input field or not

  const [errMsg, setErrMsg] = useState(""); // to add some state for possible error message if an error exist
  const [success, setSucuss] = useState(""); // and sucucess if successfully submited the reg form

  // for setting the focus on user input when the component loads
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // to check every time the user changed if it's valid or not
  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  // to check every time the pwd or match pwd change if password valid and if password = matched password
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd && pwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  // to cleat error message when user change user, password or match password
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  // handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // security frature to avoid if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);

    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    console.log(user, pwd);
    setSucuss(true);
    console.log(success);
  };

  /* -------------------------- return npx code  --------------------------*/
  return (
    <>
      {success ? (
        <section>
          <h1>success</h1>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? regStyle.errMsg : regStyle.offscreen}
            // aria-alive="assertive"
          >
            {errMsg}
          </p>

          <h1>Register</h1>

          <form onSubmit={handleSubmit}>
            {/*-------------------- user name part------------------------ */}
            <label htmlFor="username">
              Username:
              <span className={validName ? regStyle.valid : regStyle.hide}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validName || !user ? regStyle.hide : regStyle.invalid
                }
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>

            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName
                  ? regStyle.instructions
                  : regStyle.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters. <br />
              Must begin with a letter. <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            {/*-------------------- password part------------------------ */}
            <label htmlFor="password">
              Password:
              <span className={validPwd ? regStyle.valid : regStyle.hide}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={validPwd || !pwd ? regStyle.hide : regStyle.invalid}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? false : true}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            ></input>
            <p
              id="pwdnote"
              className={
                PwdFocus && !validPwd
                  ? regStyle.instructions
                  : regStyle.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent">%</span>
            </p>

            {/*-------------------- match password part------------------------ */}
            <label htmlFor="confirm_pwd">
              confirm password:
              <span className={validMatch ? regStyle.valid : regStyle.hide}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validMatch || !matchPwd ? regStyle.hide : regStyle.invalid
                }
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={matchPwd ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch
                  ? regStyle.instructions
                  : regStyle.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field
            </p>
            {/*------------------- submit button -------------------- */}
            <button
              disabled={!validMatch || !validPwd || !validName ? true : false}
            >
              sign up
            </button>
          </form>
          {/* ------------------------------------------------------------------- */}
          <p>
            Already Registered?
            <br />
            <span className={Register.line}>
              <Link to="/Login">Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
}

export default Register;
