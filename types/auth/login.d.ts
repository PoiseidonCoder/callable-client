import { Role } from "../enum-common"

export type LoginRequestDto = {
    email: string,
    password: string,
}
export type LoginResponseDto = {
    id: string,
    role: Role
    email: string,
}
