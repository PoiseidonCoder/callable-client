import { AppSidebar } from '@/components/layouts/app-sidebar'
import FriendHeader from '@/components/layouts/friend-header'
import SocketProvider from '@/components/providers/socket-provider'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { usePathname } from '@/i18n/navigation'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <AppSidebar />
            <SidebarTrigger className="md:hidden" />
            <SidebarInset className="flex flex-col min-h-screen">
                <div
                    className='flex min-h-screen w-full bg-cover bg-no-repeat'
                    style={{ backgroundImage: "url('./images/auth-bg.png')" }}
                >
                    <SocketProvider>
                        {children}
                    </SocketProvider>
                </div>
            </SidebarInset>
        </>
    )
}

export default AuthLayout