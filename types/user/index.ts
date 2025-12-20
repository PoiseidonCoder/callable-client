import { Role } from "../enum-common"

export type CurrentUserDto = {
    id: number,
    fullname: string,
    avatar: string,
    role: Role[]
}