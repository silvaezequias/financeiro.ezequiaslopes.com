import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { database } from "@/lib/database";

const authOptions = {
  session: {
    strategy: "jwt",
    updateAge: 10 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "CPF e Senha",
      credentials: {
        cpf: { label: "CPF", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.cpf || !credentials?.password) return null;

        const user = await database.user.findUnique({
          where: { cpf: credentials.cpf },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          verified: user.verified,
        };
      },
    }),
  ],
  pages: { signIn: "/auth/login" },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.verified = user.verified;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.verified = token.verified as boolean;
      }
      return session;
    },
  },
} as AuthOptions;

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;

export { authOptions };
