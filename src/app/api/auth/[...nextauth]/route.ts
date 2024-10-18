import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
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
      async authorize(credentials, req) {
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
          email: user.correoUsuario,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
