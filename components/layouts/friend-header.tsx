import { Link } from '@/i18n/navigation'
import { NavItem } from '@/types/common'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@radix-ui/react-navigation-menu'
import { UserCheck, UserPlus, UserRound } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

const FriendHeader = async () => {
    const t = await getTranslations("FriendHeader");

    const headerFriendPage: NavItem = [
        { name: "suggestFriend", href: "/friend", icon: UserPlus },
        { name: "myFriend", href: "/friend/my", icon: UserCheck },
        { name: "sentedFriend", href: "/friend/sented", icon: UserRound },
    ]

    return (
        <div className='fixed  justify-end top-0 left bg-background w-full'>
            <NavigationMenu>
                <NavigationMenuList className='flex items-end gap-5 '>
                    {
                        headerFriendPage.map(item => (
                            <NavigationMenuItem key={item.name} >
                                <NavigationMenuTrigger>
                                    <Link className="flex gap-2 hover:opacity-50" href={item.href}>
                                        <item.icon />{t(item.name)}
                                    </Link>
                                </NavigationMenuTrigger>
                            </NavigationMenuItem>
                        ))
                    }
                </NavigationMenuList>
            </NavigationMenu>
        </div >
    )
}

export default FriendHeader