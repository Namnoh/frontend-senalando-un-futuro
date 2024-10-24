import NextAuth from "next-auth";
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { Usuario } from "@/interfaces/usuarioInterface";

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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  callbacks: {
    async signIn({ user, }) {
      const email = user.email;

      const response = await fetch(`${process.env.API_URL}/users/authorize/${email}`);
      const userData = await response.json();

      if (response.ok) {
        user.id = userData.idUsuario;
        return true;
      } else if (response.status === 404) {
        const nameParts = (user.name || "").trim().split(" ");

        let nombreUsuario = "";
        let apellidoUsuario = "";
    
        if (nameParts.length >= 4) {
          nombreUsuario = nameParts[0];
          apellidoUsuario = nameParts[2];
        } else {
          nombreUsuario = nameParts[0];
          apellidoUsuario = nameParts.slice(1).join(" ") || "";
        }
        
        const newUser = {
          nombreUsuario: nombreUsuario,
          apellidoUsuario: apellidoUsuario,
          correoUsuario: email,
          contrasenaUsuario: "", 
          idRol: 1, 
        };

        const createResponse = await fetch(`${process.env.API_URL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (createResponse.ok) {
          const usuario : Usuario = await createResponse.json()
          user.id = usuario.idUsuario
          return true; 
        } else {
          console.error("Error creando el usuario:", await createResponse.json());
          return false; 
        }
      } else {
        console.error("Error al autorizar el usuario:", userData.message);
        return false; 
      }
    },
    async jwt({ token, user, account }) {
      if (account?.provider === "google") {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = Number(user.id);
        token.lastname = user.lastname;
        token.idRol = user.idRol;
      } 
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number;
        session.user.lastname = token.lastname as string;
        session.user.idRol = token.idRol as number; 
        session.accessToken = token.accessToken;
      }     
      return session;
    }
  }
  ,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: 'jwt'
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
