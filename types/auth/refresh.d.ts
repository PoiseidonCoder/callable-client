export type RefreshTokenRequestDto = {
    refreshToken: string
}
export type RefreshTokenResponseDto = {
    accessToken: string,
    refreshToken: string,
    accessTokenExpiresAt: number,
}