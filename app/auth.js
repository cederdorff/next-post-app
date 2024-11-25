import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Add additional properties to the token
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.username = user.username;
        token.bio = user.bio;
        token.location = user.location;
        token.blog = user.blog;
        token.fbId = user.fbId;
      }
      return token;
    },
    async session({ session, token }) {
      // Add additional properties to the session
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.picture;
      session.user.username = token.username;
      session.user.bio = token.bio;
      session.user.location = token.location;
      session.user.blog = token.blog;
      session.user.fbId = token.fbId;
      return session;
    },
    async signIn({ user, account, profile }) {
      // You can perform additional logic here
      console.log("---------- signIn ----------");

      console.log(user, account, profile);

      const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users.json?orderBy="mail"&equalTo="${user.email}"`;
      const response = await fetch(url);
      const data = await response.json();
      console.log("-----------------");
      console.log(data);

      if (Object.keys(data).length === 0) {
        const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users.json`;
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            mail: user.email,
            name: user.name,
            image: user.image
          })
        });
        const data = await response.json();
        const fbUid = data.name;
        console.log("fbId", fbUid);
        user.fbId = fbUid;
      }

      return true;
    }
  }
});
