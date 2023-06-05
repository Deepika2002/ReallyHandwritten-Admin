import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../prisma/prisma";
import bcrypt from "bcrypt";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},

      async authorize(credentials, req) {
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: { email }
        });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!user || !isMatch) {
          throw new Error("Invalid email or password");
        }

        if (user && isMatch) {
          return {
            ...user,
            id: user.id,
          };
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && token.id) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.verificationCode = token.verificationCode;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (token && user && user.id) {
        token.id = user.id;
        token.role = user.role;
        token.verificationCode = user.verificationCode;
      }
      return token;
    },
  },

  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
});
