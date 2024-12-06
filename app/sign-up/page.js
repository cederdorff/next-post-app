import { redirect } from "next/navigation";
import { getSession } from "../auth";
import FormSignIn from "../components/FormSignIn";
import FormSignUp from "../components/FormSignUp";

export default async function SignIn() {
  const session = await getSession();
  // if the user is already signed in, redirect them to the profile page
  if (session) {
    redirect("/profile");
  }

  return (
    <main id="sign-in-page" className="page">
      <section className="container">
        <h1>Sign Up</h1>
        <FormSignUp />
      </section>
    </main>
  );
}
