import { Role } from "../enum-common"

export type LoginRequestDto = {
    email: string,
    password: string,
}
export type LoginResponseDto = {
    user: {
        id: string,
        email: string,
        role: Role[],
        avatar: string,
    },
    accessToken: string,
    accessTokenExpiresTime: number,
    refreshToken: string,
    refreshTokenExpiresTime: number,
}
