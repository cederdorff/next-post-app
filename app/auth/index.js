import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { createUser, getUserByMail } from "./helpers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],
  callbacks: {
    async session({ session }) {
      // Add additional properties to the session
      if (!session.fbUid) {
        // Get the user from the database
        let fbUser = await getUserByMail(session.user.email);
        // If the user doesn't exist in the database, create a new user
        if (!fbUser) {
          fbUser = await createUser({
            mail: session.user.email,
            name: session.user.name,
            image: session.user.image
          });
        }
        // Add the Firebase UID to the session
        session.fbUid = fbUser.id;
      }
      return session;
    }
  }
});
