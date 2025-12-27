"use client"

import { usePresenceStore } from "@/hooks/store/presence.store";

const AboutPage = () => {
    const onlineUsers = usePresenceStore(state => state.onlineUsers);

    return (
        <>
            <div className="bg-background p-10">list user</div>
            {
                [...onlineUsers].map((item) => (
                    <div>
                        {item}
                    </div>
                ))
            }
        </>
    )
}

export default AboutPage