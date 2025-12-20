import Image from "next/image";
import { ToggleTheme } from "../features/toggle-theme";
import { SwitchLanguage } from "../features/switch-language";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@radix-ui/react-navigation-menu";
import { AUTH_ROUTES } from "@/constants/route";
import { listFunction } from "./app-sidebar";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export const AppHeader = async () => {
  const t = await getTranslations("AppHeader");
  return (
    <div>
      <div className=" fixed top-0 left-0 w-full h-16 bg-background/90 text-foreground z-50 flex justify-between items-center ">
        <Link href={"/"}>
          <Image
            src={"/images/logo-app.png"}
            alt="Logo App"
            width={80}
            height={80}
            className="ml-4 object-cover"
          />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="sm:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="max-w-50" side="left">
            <SheetTitle>Callable</SheetTitle>
            {listFunction.map(item => (
              <div key={item.name} className="pt-2">
                <Link className="flex gap-2 hover:opacity-50" key={item.href} href={item.href}>
                  <item.icon />{t(item.name)}
                </Link>
              </div>
            ))}
          </SheetContent>
        </Sheet>
        <NavigationMenu className="hidden sm:block">
          <NavigationMenuList className="flex items-center justify-center gap-7">
            {
              listFunction.map(item => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuTrigger>
                    <Link className="flex gap-2 hover:opacity-50" href={item.href}><item.icon />{t(item.name)}</Link>
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
              ))
            }
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex justify-center items-center gap-4 mr-4">
          <div className="flex flex-col sm:flex-row justify-center items-center sm:gap-4 ">
            <Link className="text-center py-1 min-w-23 bg-gradient-primary rounded-[5px]" href={AUTH_ROUTES.LOGIN}>{t("login")}</Link>
            <Link className="text-center py-1 min-w-23 border-2 rounded-[5px]" href={AUTH_ROUTES.REGISTER}>{t("register")}</Link>
          </div>
          <SwitchLanguage className="" />
          <div>
            <ToggleTheme />
          </div>
        </div>
      </div>
    </div >
  );
};
