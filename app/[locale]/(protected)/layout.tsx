import { AppSidebar } from '@/components/layouts/app-sidebar'
import SocketProvider from '@/components/providers/socket-provider'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (

        <>
            <AppSidebar />
            <SidebarTrigger className="md:hidden" />
            <SidebarInset className="flex flex-col min-h-screen">
                <div
                    className='flex items-center justify-center min-h-screen w-full bg-cover bg-no-repeat'
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