import { DefaultSession } from "next-auth/jwt"
import { Role } from "./types/enum-common"

declare module "next-auth" {
    interface Session {
        user: {
            email: string
            role: Role[]
        } & DefaultSession["user"]

        accessToken: string
        accessTokenExpiresAt: number
        refreshToken: string
        refreshTokenExpiresAt: number
    }

    interface User {
        email: string
        role: Role[]
        avatar: string
        accessToken: string
        accessTokenExpiresAt: number
        refreshToken: string
        refreshTokenExpiresAt: number
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        email: string
        role: Role[]
        accessToken: string
        accessTokenExpiresAt: number
        refreshToken: string
        refreshTokenExpiresAt: number
    }
}