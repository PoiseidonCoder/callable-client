import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Contact, HandshakeIcon, Home, Info, PhoneForwardedIcon } from "lucide-react";
import Image from "next/image";
import { SwitchLanguage } from "../features/switch-language";
import { ToggleTheme } from "../features/toggle-theme";
import { MAIN_ROUTES } from "@/constants/route";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import MenuUser from "../features/user-menu";
import { Link } from "@/i18n/navigation";
import { NavItem } from "@/types/common";

export const sidebarAppList: NavItem = [
  { name: "home", href: "/", icon: Home, className: "bg-gradient-to-br from-green-400 to-blue-500 text-white" },
  { name: "friend", href: "/friend", icon: HandshakeIcon, className: "bg-gradient-to-br from-yellow-400 to-orange-500 text-white" },
  { name: "about", href: "/about", icon: Info, className: "bg-gradient-to-br from-blue-400 to-indigo-500 text-white" },
  { name: "services", href: "/services", icon: PhoneForwardedIcon, className: "bg-gradient-to-br from-purple-400 to-pink-500 text-white" },
  { name: "contact", href: "/contact", icon: Contact, className: "bg-gradient-to-br from-red-400 to-rose-500 text-white" },
];

export async function AppSidebar() {
  const t = await getTranslations("AppSidebar");

  const session = await auth();

  return (
    <Sidebar collapsible="icon" variant="inset" className="w-64 transition-all duration-300 shrink-0 bg-background/90 ">
      <SidebarHeader>
        <div className="flex items-center group-data-[collapsible=icon]:flex-col">
          <Link href={MAIN_ROUTES.HOME} className="flex items-center gap-2">
            <Image src={"/images/logo-app.png"} alt="Logo App" width={50} height={50} className=" object-cover self-start" />
            <div className="group-data-[collapsible=icon]:hidden">
              <Label className="text-3xl font-medium text-pink-400">{t("app")}</Label>
              <Label className="text-[12px] text-muted-foreground max-w-32">{t("description")}</Label>
            </div>
          </Link>
          <ToggleTheme />
        </div>
        <div className="w-full flex justify-center">
          <SwitchLanguage className="group-data-[collapsible=icon]:hidden" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {sidebarAppList.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild>
                <Link href={item.href} className="flex mx-auto">
                  <div className={`size-5 rounded-xl flex items-center justify-center ${item.className}`}>
                    <item.icon size={12} />
                  </div>

                  <span className="group-data-[collapsible=icon]:hidden">{t(item.name)}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <MenuUser user={session?.user} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
