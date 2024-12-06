"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebaseConfig";

export default function FormSignIn() {
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSignIn(event) {
    event.preventDefault();
    const mail = event.target.mail.value; // mail value from inout field in sign in form
    const password = event.target.password.value; // password value from inout field in sign in form

    try {
      await signInWithEmailAndPassword(auth, mail, password);
    } catch (error) {
      let code = error.code; // saving error code in variable
      code = code.replaceAll("-", " "); // some JS string magic to display error message. See the log above in the console
      code = code.replaceAll("auth/", "");
      setErrorMessage(code);
    }
  }
  return (
    <form id="sign-in-form" onSubmit={handleSignIn}>
      <label htmlFor="mail">Mail</label>
      <input id="mail" type="email" name="mail" aria-label="mail" placeholder="Type your mail..." required />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        aria-label="password"
        placeholder="Type your password..."
        autoComplete="current-password"
      />
      <div className="error-message">
        <p>{errorMessage}</p>
      </div>
      <div className="btns">
        <button>Sign In</button>
      </div>
    </form>
  );
}
