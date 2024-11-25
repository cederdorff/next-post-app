import { redirect } from "next/navigation";
import { auth, signIn } from "../auth";

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
    <section id="sign-in-page" className="page">
      <h1>Sign In</h1>
      <form id="sign-in-form" action={handleSignInWithGitHub}>
        <button className="btn-github">Sign In with GitHub</button>
      </form>
      <form id="sign-in-form" action={handleSignInWithGoogle}>
        <button className="btn-github">Sign In with Google</button>
      </form>
    </section>
  );
}
