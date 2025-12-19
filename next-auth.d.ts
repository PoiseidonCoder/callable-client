import { DefaultSession } from "next-auth/jwt"
import { Role } from "./types/enum-common"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            role: string
        } & DefaultSession["user"]
    }

    interface User {
        id: string
        role: Role,
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        role: Role
    }
}