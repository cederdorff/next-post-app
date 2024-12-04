import { redirect } from "next/navigation";
import { auth, signIn } from "../../auth";
import Link from "next/link";
import FormSignIn from "../../components/FormSignIn";

export default async function SignIn() {
  const session = await auth();
  if (session) {
    redirect("/profile");
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
        <p className="text-center">
          Don&apos;t have an account? <Link href="/sign-up">Create an account here.</Link>
        </p>
      </section>
    </main>
  );
}
