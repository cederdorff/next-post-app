"use client";
import { useActionState } from "react";

export default function FormSignUp({ signUpAction }) {
  const [state, formAction] = useActionState(signUpAction, null);

  return (
    <form id="sign-up-form" action={formAction}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" placeholder="Type your name..." defaultValue={state.name} required />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Type your email..."
        defaultValue={state.email}
        required
        className={state.message ? "error" : ""}
      />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" placeholder="Type a password..." required />
      <button type="submit">Sign Up</button>
      {state.message && <p className="error-message">{state.message}</p>}
    </form>
  );
}
