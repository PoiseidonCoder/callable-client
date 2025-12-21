import { create } from 'zustand'


export type PresenceStore = {
    isConnected: boolean
    onlineUsers: Set<string>

    setIsConnected: (v: boolean) => void
    userOnline: (userId: string) => void
    userOffline: (userId: string) => void
}

export const usePresenceStore = create<PresenceStore>((set) => ({
    isConnected: false,
    onlineUsers: new Set(),

    setIsConnected: (v) => set({ isConnected: v }),

    userOnline: (email) =>
        set((state) => {
            const next = new Set(state.onlineUsers)
            next.add(email)
            return { onlineUsers: next }
        }),

    userOffline: (email) =>
        set((state) => {
            const next = new Set(state.onlineUsers)
            next.delete(email)
            return { onlineUsers: next }
        })
}))
