import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/db";
import * as bcrypt from "bcrypt";
export const { handlers, signIn, signOut, auth } = NextAuth({
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
            },
            select: {
              id: true,
              name: true,
              role: true,
              password: true,
            },
          });
          if (!isGuru || !isGuru.password) return null;
          // const isMatched = await bcrypt.compare(
          //   passwordLogin as string,
          //   isGuru.password
          // );
          // if (!isMatched) return null;

          return isGuru;
        } else if (reqfrom === "Siswa") {
          const isMurid = await prisma.siswa.findFirst({
            where: {
              name: nameLogin,
            },
            select: {
              id: true,
              name: true,
              role: true,
              password: true,
            },
          });
          if (!isMurid || !isMurid.password) return null;
          const isMatched = await bcrypt.compare(
            passwordLogin as string,
            isMurid.password
          );
          if (!isMatched) return null;

          return isMurid;
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
        token.role = user.role; // <--- Data ditambahkan ke token JWT
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id; // <--- Data diambil dari token dan ditambahkan ke session.user
        session.user.role = token.role; // <--- Data diambil dari token dan ditambahkan ke session.user
      }
      return session;
    },
  },
});
