import { AppSidebar } from "@/components/layouts/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <AppSidebar />
            <SidebarTrigger className="md:hidden" />
            <SidebarInset className="flex flex-col min-h-screen">
                <main>
                    {children}
                </main>
            </SidebarInset>

        </>
    )
}
export default AuthLayout