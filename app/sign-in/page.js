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

  async function handleSignInWithEmailAndPassword(currentState, formData) {
    "use server";
    try {
      await signIn("credentials", formData);
      redirect("/posts");
    } catch (error) {
      return { message: "Invalid email or password", email: formData.get("email") };
    }
  }

  return (
    <main id="sign-in-page" className="page">
      <section className="container">
        <h1>Sign In</h1>
        <FormSignIn signInAction={handleSignInWithEmailAndPassword} />
        <p>
          Don&apos;t have an account? <Link href="/sign-up">Create an account here.</Link>
        </p>
        <p>Or continue with GitHub or Google:</p>
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
