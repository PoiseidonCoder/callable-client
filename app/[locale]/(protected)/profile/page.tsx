'use client'

import { usePresenceStore } from "@/hooks/store/presence.store";


export default function ProfilePage() {
    const { isConnected } = usePresenceStore();

    return (
        <div>
            <h1>Profile</h1>
            {
                isConnected ? "connected"
                    : "connecting"
            }
        </div>
    )
}
