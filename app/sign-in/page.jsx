import Link from "next/link";
import { auth, signIn } from "../auth";

export default async function SignIn() {
  const session = await auth();
  console.log("session", session);

  async function handleSignInWithGitHub(formData) {
    "use server";

    await signIn("github", {
      redirectTo: "/posts"
    });
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-5xl text-">Sign in</h1>
        <p className="text-center sm:text-left text-[#333] dark:text-[#ccc] max-w-[30ch]">
          Sign in with your GitHub account. You can view this page without being
          signed in.
        </p>

        {!session ? (
          <form action={handleSignInWithGitHub}>
            <button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44">
              Sign In with GitHub
            </button>
          </form>
        ) : (
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/protected">
            You are signed in. Go to Protected Page
          </Link>
        )}
      </main>
    </div>
  );
}
