import { redirect } from "next/navigation";
import { getSession } from "../auth";
import FormSignIn from "../components/FormSignIn";
import Link from "next/link";

export default async function SignIn() {
  const session = await getSession();
  // if the user is already signed in, redirect them to the profile page
  if (session) {
    redirect("/profile");
  }

  return (
    <main id="sign-in-page" className="page">
      <section className="container">
        <h1>Sign In</h1>
        <FormSignIn />
        <p className="text-center">
          Don&apos;t have an account? <Link href="/sign-up">Create an account here.</Link>
        </p>
      </section>
    </main>
  );
}
