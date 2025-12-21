'use client'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { socket } from '@/lib/socket'
import { usePresenceStore } from '@/hooks/store/presence.store';

export default function SocketProvider({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const { setIsConnected } = usePresenceStore();
    useEffect(() => {
        if (!session?.accessToken) return;
        socket.connect({
            accessToken: session.accessToken,
        })
        setIsConnected(true);
        return () => {
            socket.disconnect();
            setIsConnected(false);
        }
    }, [session?.accessToken])

    return (
        <>{children}</>
    )
}
