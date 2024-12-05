import { redirect } from "next/navigation";
import { auth, signIn } from "../auth";
import Link from "next/link";
import FormSignIn from "../components/FormSignIn";

export default async function SignIn() {
  const session = await auth();
  console.log("session", session);
  if (session) {
    redirect("/profile");
  }

  async function handleSignInWithGitHub() {
    "use server";

    await signIn("github", {
      redirectTo: "/posts"
    });
  }
  async function handleSignInWithGoogle() {
    "use server";

    await signIn("google", {
      redirectTo: "/posts"
    });
  }

  return (
    <main id="sign-in-page" className="page">
      <section className="container">
        <h1>Sign In</h1>
        <form className="form-providers">
          <button type="button" className="btn-github" onClick={handleSignInWithGitHub}>
            Sign In with GitHub
          </button>
          <button type="button" className="btn-google" onClick={handleSignInWithGoogle}>
            Sign In with Google
          </button>
          <Link href="/sign-in/email" className="btn-email">
            <button type="button">Sign In with Email</button>
          </Link>
        </form>
      </section>
    </main>
  );
}
