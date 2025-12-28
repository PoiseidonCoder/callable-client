import axios from 'axios'
import { getSession } from 'next-auth/react'

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
    withCredentials: true,
})

api.interceptors.request.use(
    async (config) => {
        if (typeof window !== "undefined") {
            const session = await getSession()
            if (session?.accessToken) {
                config.headers = config.headers ?? {}
                config.headers.Authorization = `Bearer ${session.accessToken}`
            }
        }

        return config
    },
    (error) => Promise.reject(error)
)