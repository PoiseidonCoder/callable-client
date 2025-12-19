import { Role } from "../enum-common"

export type RegisterRequestDto = {
    email: string,
    password: string,
}
export type RegisterResponseDto = {
    id: string,
    role: Role
    email: string,
}
