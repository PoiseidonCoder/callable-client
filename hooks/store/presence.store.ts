import { create } from 'zustand'


export type PresenceStore = {
    isConnected: boolean
    onlineUsers: Set<number>

    setIsConnected: (v: boolean) => void
    userOnline: (userId: number) => void
    userOffline: (userId: number) => void
}

export const usePresenceStore = create<PresenceStore>((set) => ({
    isConnected: false,
    onlineUsers: new Set(),

    setIsConnected: (v) => set({ isConnected: v }),

    userOnline: (userId) =>
        set((state) => {
            const next = new Set(state.onlineUsers)
            next.add(userId)
            return { onlineUsers: next }
        }),

    userOffline: (userId) =>
        set((state) => {
            const next = new Set(state.onlineUsers)
            next.delete(userId)
            return { onlineUsers: next }
        })
}))
