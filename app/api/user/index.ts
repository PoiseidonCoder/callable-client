import { api } from ".."


const baseUrlUser = "/user"

export const getCurrentUser = async () => {
    return (await api.get(`${baseUrlUser}/me`)).data;
}