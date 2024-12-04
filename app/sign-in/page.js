import { redirect } from "next/navigation";
import { auth, signIn } from "../auth";
import Link from "next/link";

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

  async function handleSignInWithEmailAndPassword(formData) {
    "use server";

    await signIn("credentials", formData);
  }

  return (
    <main id="sign-in-page" className="page">
      <section className="container">
        <h1>Sign In</h1>
        <form id="sign-in-form" action={handleSignInWithEmailAndPassword}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
          <label></label>
          <button type="submit">Sign In</button>
        </form>
        <p>
          Don&apos;t have an account? <Link href="/sign-up">Sign up here</Link>
        </p>
        <form>
          <button type="button" className="btn-github" onClick={handleSignInWithGitHub}>
            Sign In with GitHub
          </button>
          <button type="button" className="btn-google" onClick={handleSignInWithGoogle}>
            Sign In with Google
          </button>
        </form>
      </section>
    </main>
  );
}
