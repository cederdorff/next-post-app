"use client";
import { useActionState } from "react";

export default function FormSignIn({ signInAction }) {
  const [state, formAction] = useActionState(signInAction, {});

  return (
    <form id="sign-in-form" action={formAction}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Type your email..."
        defaultValue={state?.email}
        required
      />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" placeholder="Type your password..." required />
      <button type="submit">Sign In</button>
      {state?.message && <p className="error-message">{state.message}</p>}
    </form>
  );
}
