import { LoginRequestDto, LoginResponseDto } from "@/types/auth/login"
import { api } from ".."
import { AxiosResponse } from "axios";
import { RegisterRequestDto, RegisterResponseDto } from "@/types/auth/register";

const baseUrlAuth = "/auth"

export const postLogin = async (loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> => {
    return (await api.post(`${baseUrlAuth}/login`, loginRequestDto)).data;
}

export const postRegister = async (registerRequestDto: RegisterRequestDto): Promise<RegisterResponseDto> => {
    return (await api.post(`${baseUrlAuth}/register`, registerRequestDto)).data;
}