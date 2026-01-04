import { NavItem } from "@/types/common";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { UserCheck, UserCog, UserPlus, UserRound } from "lucide-react";
import { getTranslations } from "next-intl/server";

const FriendHeader = async () => {
  const t = await getTranslations("FriendHeader");

  const headerFriendPage: NavItem = [
    { name: "unFriend", href: "/friend", icon: UserPlus },
    { name: "myFriend", href: "/friend/my", icon: UserCheck },
    { name: "sentedFriend", href: "/friend/sented", icon: UserRound },
    { name: "requestFriend", href: "/friend/request", icon: UserCog },
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
