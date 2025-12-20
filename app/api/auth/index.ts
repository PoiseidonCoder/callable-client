import { LoginRequestDto, LoginResponseDto } from "@/types/auth/login"
import { api } from ".."
import { RegisterRequestDto } from "@/types/auth/register";
import { RefreshTokenRequestDto, RefreshTokenResponseDto } from "@/types/auth/refresh";
import { LoginGoogleRequestDto, LoginGoogleResponseDto } from "@/types/auth/google";

const baseUrlAuth = "/auth"

export const postLogin = async (loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> => {
    return (await api.post(`${baseUrlAuth}/login`, loginRequestDto)).data;
}

export const postRegister = async (registerRequestDto: RegisterRequestDto): Promise<void> => {
    await api.post(`${baseUrlAuth}/register`, registerRequestDto);
}

export const postRefreshToken = async (refreshTokenRequestDto: RefreshTokenRequestDto): Promise<RefreshTokenResponseDto> => {
    return (await api.post(`${baseUrlAuth}/refresh`, refreshTokenRequestDto)).data;
}

export const postLoginGoogle = async (loginGoogleRequestDto: LoginGoogleRequestDto): Promise<LoginGoogleResponseDto> => {
    return (await api.post(`${baseUrlAuth}/google`, loginGoogleRequestDto)).data;
}


