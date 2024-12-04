import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { createUser, getUserByMail } from "./helpers";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

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
        // check if the user exists in the database
        const dbUser = await getUserByMail(credentials.email);
        if (!dbUser || !dbUser.password) {
          return null;
        }

        // check if the password is correct
        const passwordMatch = await bcrypt.compare(credentials.password, dbUser.password);
        if (!passwordMatch) {
          return null;
        }

        const user = {
          email: dbUser.mail,
          name: dbUser.name,
          image: dbUser.image
        };
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
