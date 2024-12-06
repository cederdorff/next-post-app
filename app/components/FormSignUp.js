"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { createUser } from "../auth/helpers";

export default function FormSignUp() {
  const [errorMessage, setErrorMessage] = useState("");

  function handleSignUp(event) {
    event.preventDefault();
    const form = event.target;

    const name = form.name.value;
    const mail = form.mail.value;
    const password = form.password.value;

    createUserWithEmailAndPassword(auth, mail, password)
      .then(userCredential => {
        // Created and signed in
        const user = userCredential.user;
        createUser(user.uid, name, mail); // creating a new user in the database
      })
      .catch(error => {
        let code = error.code; // saving error code in variable
        console.log(code);
        code = code.replaceAll("-", " "); // some JS string magic to display error message. See the log above in the console
        code = code.replaceAll("auth/", "");
        setErrorMessage(code);
      });
  }

  return (
    <form id="sign-up-form" onSubmit={handleSignUp}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" placeholder="Type your name..." d required />
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" placeholder="Type your email..." required />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" placeholder="Type a password..." required />
      <div className="error-message">
        <p>{errorMessage}</p>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}
