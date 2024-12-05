import { redirect } from "next/navigation";
import { auth } from "../auth";
import FormSignIn from "../components/FormSignIn";

export default async function SignIn() {
  const session = await auth();
  // if the user is already signed in, redirect them to the profile page
  if (session) {
    redirect("/profile");
  }

  return (
    <main id="sign-in-page" className="page">
      <section className="container">
        <h1>Sign In</h1>
        <FormSignIn />
      </section>
    </main>
  );
}
