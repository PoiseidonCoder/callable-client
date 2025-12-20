import {
    Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu,
    SidebarMenuButton, SidebarMenuItem, SidebarRail,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Label } from "@radix-ui/react-dropdown-menu";
import { ChevronUp, Contact, Home, Info, PhoneForwardedIcon } from "lucide-react";
import Image from "next/image";
import { SwitchLanguage } from "../features/switch-language";
import { ToggleTheme } from "../features/toggle-theme";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MAIN_ROUTES } from "@/constants/route";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import MenuUser from "../features/user-menu";
import { Link } from "@/i18n/navigation";

export const listFunction = [
    { name: "home", href: "/", icon: Home },
    { name: "about", href: "/about", icon: Info },
    { name: "services", href: "/services", icon: PhoneForwardedIcon },
    { name: "contact", href: "/contact", icon: Contact },
];

export async function AppSidebar() {

    const t = await getTranslations("AppSidebar");

    const session = await auth();


    return (
        <Sidebar
            collapsible="icon"
            variant="inset"
            className="w-64 data-[collapsible=icon]:w-16 transition-all duration-300 shrink-0 bg-background/90"
        >
            <SidebarHeader>
                <div className="flex items-center group-data-[collapsible=icon]:flex-col">
                    <Link href={MAIN_ROUTES.HOME} className="flex items-center gap-2">
                        <Image
                            src={"/images/logo-app.png"}
                            alt="Logo App"
                            width={50}
                            height={50}
                            className=" object-cover self-start"
                        />
                        <div className="group-data-[collapsible=icon]:hidden">
                            <Label className="text-3xl font-medium text-pink-400">Callable</Label>
                            <Label className="text-[12px] text-muted-foreground max-w-32">{t("description")}</Label>
                        </div>
                    </Link>
                    <ToggleTheme />
                </div>
                <SwitchLanguage className="group-data-[collapsible=icon]:hidden" />
            </SidebarHeader>
            <SidebarContent >
                <SidebarMenu>
                    {listFunction.map((item, index) => (
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton asChild>
                                <Link
                                    href={item.href}
                                    className="flex mx-auto"
                                >
                                    <item.icon className="size-5 shrink-0" />
                                    <span className="group-data-[collapsible=icon]:hidden">
                                        {t(item.name)}
                                    </span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem >
                        <MenuUser user={session?.user} />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
