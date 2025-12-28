import { Link } from "@/i18n/navigation";
import { NavItem } from "@/types/common";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import { UserCheck, UserPlus, UserRound } from "lucide-react";
import { getTranslations } from "next-intl/server";

const FriendHeader = async () => {
  const t = await getTranslations("FriendHeader");

  const headerFriendPage: NavItem = [
    { name: "unFriend", href: "/friend", icon: UserPlus },
    { name: "myFriend", href: "/friend/my", icon: UserCheck },
    { name: "sentedFriend", href: "/friend/sented", icon: UserRound },
  ];

  return (
    <div className="fixed top-0 left-0 bg-background/90 w-full">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-5 justify-center ">
          {headerFriendPage.map((item) => (
            <NavigationMenuItem key={item.name} className="hover:opacity-50 p-2 ">
              <NavigationMenuLink className="flex gap-2 " href={item.href}>
                <item.icon />
                {t(item.name)}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default FriendHeader;
