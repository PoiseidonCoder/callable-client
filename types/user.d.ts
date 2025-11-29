export type User = {
    id: string;
    email?: string;
    role: string;
    avatarUrl?: string;
};

export type AuthState = {
    user: User | null;
    sessionToken: string | null;
    refreshToken: string | null;
    expirationTime: number | null;
};

export type AuthRequest = {
    email: string;
    password: string;
};

export type AuthResponse = {
    user: User;
    sessionToken: string;
    refreshToken: string;
    expirationTime: number;
};