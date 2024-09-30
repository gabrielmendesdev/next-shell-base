import { AuthUser } from "@/service/user/UserService";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        // Função mockada para simular o login (substitua pelo endpoint de login da API)
        const mockLogin = (
          email: string,
          password: string,
        ): AuthUser | null => {
          const mockUser: AuthUser = {
            id: "1",
            name: "John Doe",
            email: email,
            token: "mocked-token-12345",
          };

          if (email === "test@example.com" && password === "password123") {
            return mockUser;
          }

          return null;
        };

        try {
          const user = mockLogin(credentials.email, credentials.password);
          return user;
        } catch (error) {
          throw new Error(`Erro ao realizar o login: ${error}`);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as AuthUser;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user as AuthUser;
      return session;
    },
  },
};
