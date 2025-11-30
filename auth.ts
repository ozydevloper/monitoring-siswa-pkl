import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/error",
  },
  providers: [
    Credentials({
      credentials: {
        namelogin: {},
        passwordlogin: {},
        role: {},
      },
      async authorize(credentials) {
        const nameLogin = credentials.namelogin;
        const passwordLogin = credentials.passwordlogin;
        const reqfrom = credentials.role;

        if (!nameLogin || !passwordLogin) {
          return null;
        }

        if (reqfrom === "Guru") {
          const isGuru = await prisma.guru.findFirst({
            where: {
              name: nameLogin,
              password: passwordLogin,
            },
            select: {
              id: true,
              name: true,
              role: true,
              password: true,
            },
          });
          if (!isGuru || !isGuru.password) return null;
          if (isGuru.role !== "GURU") {
            return null;
          }

          return {
            role: isGuru.role as "GURU",
            name: isGuru.name,
            id: isGuru.id,
          };
        } else if (reqfrom === "Siswa") {
          const isMurid = await prisma.siswa.findFirst({
            where: {
              name: nameLogin,
              password: passwordLogin,
            },
            select: {
              id: true,
              name: true,
              role: true,
              password: true,
            },
          });
          if (!isMurid || !isMurid.password) return null;
          if (isMurid.role !== "SISWA") {
            return null;
          }
          return {
            role: isMurid.role as "SISWA",
            name: isMurid.name,
            id: isMurid.id,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "GURU" | "SISWA";
      }
      return session;
    },
  },
});
