"use client"

import { usePresenceStore } from "@/hooks/store/presence.store";
import { useEffect } from "react";

const AboutPage = () => {
    const onlineUsers = usePresenceStore(state => state.onlineUsers);

    return (
        <>
            <div>list user</div>
            {
                [...onlineUsers].map((item) => (
                    <div>x
                        {item}
                    </div>
                ))
            }
        </>
    )
}

export default AboutPage