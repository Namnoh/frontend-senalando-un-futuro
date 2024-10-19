import NextAuth from "next-auth";
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@correo.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any>{
        const response = await fetch(
          `${process.env.API_URL}/users/authorize/${credentials?.email}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          return null;
        }

        const user = await response.json();

        const matchPassword = await bcrypt.compare(
          credentials!.password,
          user.contrasenaUsuario
        );

        if (!matchPassword) return null;

        return {
          id: user.idUsuario,
          name: user.nombreUsuario,
          lastname: user.apellidoUsuario,
          email: user.correoUsuario,
          idRol: user.idRol
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = Number(user.id)
        token.lastname = user.lastname
        token.idRol = user.idRol
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number
        session.user.lastname = token.lastname as string
        session.user.idRol = token.idRol as number
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: 'jwt'
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
