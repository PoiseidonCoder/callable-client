export type LoginGoogleRequestDto = {
    idToken: string
}
export type LoginGoogleResponseDto = {
    user: {
        id: string,
        role: Role[]
        email: string,
    },
    accessToken: string,
    accessTokenExpiresTime: number,
    refreshToken: string,
    refreshTokenExpiresTime: number,
}
