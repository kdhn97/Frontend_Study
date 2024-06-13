import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "이메일", type: "text", placeholder: "" },
          password: { label: "비밀번호", type: "password" },
        },
        async authorize(credentials, req) {
          const res = await fetch("http://localhost:8080/api/v1/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.username,
              password: credentials?.password,
            }),
          });
          const user = await res.json();
          if (user) {
            return user;
          } else {
            return null;
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        return { ...token, ...user };
      },
      async session({ session, token, user }) {
        session.user = token as any;
        return session;
      },
    },
    pages: {
      signIn: "/login",
    },
  });

export { handler as GET, handler as POST }