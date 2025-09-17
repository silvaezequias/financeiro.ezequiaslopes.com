import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { database } from "@/lib/database";
import { User } from "@prisma/client";
import { UserRole } from "@/lib/authorization/role";

const authOptions = {
  session: {
    strategy: "jwt",
    updateAge: 10 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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
          user.password!
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
    async signIn(params) {
      if (params.account?.provider === "google") {
        const existingUser = await database.user.findUnique({
          where: { email: params.user.email! },
        });

        if (existingUser) {
          if (existingUser.googleId !== params.user.id) {
            await database.user.update({
              where: { email: params.user.email! },
              data: { googleId: params.user.id },
            });
          }
        } else {
          await database.user.create({
            data: {
              email: params.user.email!,
              googleId: params.user.id!,
              name: params.user.name!,
              role: UserRole.id,
              verified: false,
            },
          });
        }
      }

      return true;
    },
  },
} as AuthOptions;

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;

export { authOptions };
