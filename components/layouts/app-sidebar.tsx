import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Link } from "@/i18n/routing";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Label } from "@radix-ui/react-dropdown-menu";
import { ChevronUp, Contact, Home, Info, PhoneForwardedIcon } from "lucide-react";
import Image from "next/image";
import { SwitchLanguage } from "../ui/switch-language";
import { ToggleTheme } from "../ui/toggle-theme";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MAIN_ROUTES } from "@/constants/route";

export function AppSidebar() {

    const t = useTranslations("Nav")

    const list = [
        { name: "home", href: "/", icon: Home },
        { name: "about", href: "/about", icon: Info },
        { name: "services", href: "/services", icon: PhoneForwardedIcon },
        { name: "contact", href: "/contact", icon: Contact },
    ];


    return (
        <Sidebar
            collapsible="icon"
            variant="inset"
            className="w-64 data-[collapsible=icon]:w-16 transition-all duration-300 shrink-0"
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
                    {list.map((item, index) => (
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
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    className="bg-background mx-auto group-data-[collapsible=icon]:justify-center"
                                >
                                    <Avatar className="size-8 shrink-0 ">
                                        <AvatarImage className="size-8 rounded-full" src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback >Avatar</AvatarFallback>
                                    </Avatar>
                                    <Label className="overflow-hidden whitespace-nowrap text-ellipsis group-data-[collapsible=icon]:hidden">
                                        Mai Van Thn ThiMai Van Thn Thi
                                    </Label>
                                    <ChevronUp className="ml-auto group-data-[collapsible=icon]:hidden" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <span>Account</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Billing</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}