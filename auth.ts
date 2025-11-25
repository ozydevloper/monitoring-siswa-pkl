import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        name: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        const isExist = await prisma.siswa.findUnique({
          where: {
            name: "wefwefbuiefw",
          },
        });
      },
    }),
  ],
});
