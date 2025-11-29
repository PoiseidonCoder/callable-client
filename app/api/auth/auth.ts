import { AuthRequest, AuthResponse } from "@/types/user";
import { apiRequest } from "..";

const prefixAuthApi = 'auth';

export const fetchRegister = async (authRequest: AuthRequest): Promise<AuthResponse> => {
    const response = await apiRequest.post(`${prefixAuthApi}/register`, authRequest);
    return response as AuthResponse;
};

export const fetchLogin = async (authRequest: AuthRequest): Promise<AuthResponse> => {
    const response = await apiRequest.post(`${prefixAuthApi}/login`, authRequest);
    return response as AuthResponse;
};