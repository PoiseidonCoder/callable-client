import { DefaultSession } from "next-auth/jwt"
import { Role } from "./types/enum-common"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            email: string
            fullName: string
            role: Role[]
            avatar: string
        } & DefaultSession["user"]

        accessToken: string
        accessTokenExpiresTime: number
        refreshToken: string
        refreshTokenExpiresTime: number
    }

    interface User {
        email: string
        fullName: string
        role: Role[]
        avatar: string
        accessToken: string
        accessTokenExpiresTime: number
        refreshToken: string
        refreshTokenExpiresTime: number
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        email: string
        role: Role[]
        accessToken: string
        accessTokenExpiresTime: number
        refreshToken: string
        refreshTokenExpiresTime: number
    }
}