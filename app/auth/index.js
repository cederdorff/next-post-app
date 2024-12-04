import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { createUser, getUserByMail } from "./helpers";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async credentials => {
        let user = null;

        const dbUser = await getUserByMail(credentials.email);
        if (!dbUser) {
          throw new Error("No user found with this email.");
        }

        const passwordMatch = await bcrypt.compare(credentials.password, dbUser.password);
        if (passwordMatch) {
          user = dbUser;
          user.email = dbUser.mail;
        }

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        }

        // return user object with their profile data
        return user;
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
