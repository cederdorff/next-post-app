import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import { createUser, getUserByMail } from "../auth/helpers";
import FormSignUp from "../components/FormSignUp";

export default async function SignIn() {
  const session = await auth();
  console.log("session", session);
  if (session) {
    redirect("/profile");
  }

  async function handleSignUpWithEmailAndPassword(currentState, formData) {
    "use server";

    console.log("formData", formData);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    // check if the user already exists
    const user = await getUserByMail(email);
    if (user) {
      return { message: "User with this email already exists. ", name, email };
    }

    const salt = await bcrypt.genSalt(10); // generate a salt
    const hashedPassword = await bcrypt.hash(password, salt); // hash the password

    await createUser({
      name,
      mail: email,
      password: hashedPassword
    });

    redirect("/sign-in");
  }

  return (
    <main id="sign-in-page" className="page">
      <section className="container">
        <h1>Sign Up</h1>
        <FormSignUp signUpAction={handleSignUpWithEmailAndPassword} />
      </section>
    </main>
  );
}
