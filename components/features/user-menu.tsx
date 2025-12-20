"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Label } from '@radix-ui/react-dropdown-menu'
import { SidebarMenuButton } from '../ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { ChevronUp } from 'lucide-react'
import { User } from 'next-auth'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { signOut } from 'next-auth/react'

const MenuUser = ({ user }: { user: User }) => {
    const t = useTranslations("AppSidebar");
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                    className="bg-background mx-auto group-data-[collapsible=icon]:justify-center"
                >
                    <Avatar className="size-8 shrink-0 ">
                        <AvatarImage className="size-8 rounded-full" src={user.avatar} alt="@shadcn" />
                        <AvatarFallback className='flex justify-center items-center' >{user.email.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <Label className="overflow-hidden whitespace-nowrap text-ellipsis group-data-[collapsible=icon]:hidden">
                        {user.email}
                    </Label>
                    <ChevronUp className="ml-auto group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side="top"
                align='end'
                className="w-[--radix-popper-anchor-width] pr-5"
            >
                <DropdownMenuItem className='hover:opacity-50'>
                    <Link href={"/profile"}>{t("account")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className='hover:opacity-50'>
                    <div className='cursor-pointer' onClick={() => signOut()}>
                        {t("logout")}
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default MenuUser