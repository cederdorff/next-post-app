import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createUser, getUserByMail } from "./helpers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        if (credentials.uid && credentials.email && credentials.accessToken) {
          return { uid: credentials.uid, email: credentials.email, accessToken: credentials.accessToken };
        }
        return null;
      }
    })
  ],
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
