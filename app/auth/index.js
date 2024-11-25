import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { createUser, getUserByMail } from "./helpers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Add additional properties to the token
        token.fbUid = user.fbUid;
      }
      return token;
    },
    async session({ session, token }) {
      // Add additional properties to the session
      session.fbUid = token.fbUid;
      return session;
    },
    async signIn({ user, account, profile }) {
      // Get the user from the database
      let fbUser = await getUserByMail(user.email);
      // If the user doesn't exist in the database, create a new user
      if (!fbUser) {
        fbUser = await createUser({
          mail: user.email,
          name: user.name,
          image: user.image
        });
      }

      // Add the user to the session
      user.fbUid = fbUser.id;

      return true;
    }
  }
});
