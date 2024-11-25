import { redirect } from "next/navigation";
import { auth, signOut } from "../auth";

export default async function Profile() {
  const session = await auth();
  const user = session?.user;
  console.log("session", session);

  if (!session) {
    redirect("/sign-in");
  }
  return (
    <section className="page">
      <div className="container">
        <h1>Profile</h1>
        <button
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          onClick={async () => {
            "use server";
            await signOut();
          }}>
          Sign out
        </button>
      </div>
    </section>
  );
}
