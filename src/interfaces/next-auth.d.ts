import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session extends DefaultSession {
        accessToken?: string;
        user: {
        id: number
        lastname?: string | null
        idRol?: number | null
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        id: number
        lastname?: string | null
        idRol?: number | null
    }
}

declare module "next-auth/jwt" {
    
    interface JWT {
        accessToken?: string;
        id: number
        lastname?: string | null
        idRol?: number | null
    }
}