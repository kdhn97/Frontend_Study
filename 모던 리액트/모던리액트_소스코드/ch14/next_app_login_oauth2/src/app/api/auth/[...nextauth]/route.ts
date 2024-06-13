import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
    providers: [
      GitHubProvider({
        profile(profile) {
          let userRole = "ROLE_USER";
          if(profile?.email === 'byungsun.jun@gmail.com') {
            userRole = "ROLE_ADMIN";
          }
          return {
            ...profile,
            role: userRole
          }
        },
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
      }),
      GoogleProvider({
        profile(profile) {
          let userRole = "ROLE_USER";
          if(profile?.email === 'byungsun.jun@gmail.com') {
            userRole = "ROLE_ADMIN";
          }
          return {
            ...profile,
            id: profile.sub,
            role: userRole
          }
        },
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
      }),      
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
            user["role"] = "ROLE_USER";
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
    // pages: {
    //   signIn: "/login",
    // },
  });

export { handler as GET, handler as POST }


