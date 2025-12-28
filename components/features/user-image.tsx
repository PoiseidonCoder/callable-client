import { cn } from "@/lib/utils"
import { AvatarImage } from "@radix-ui/react-avatar"

export const UserImage = ({ src, className }: { src: string, className: string }) => {
    return (
        <>
            {
                src ? <AvatarImage className={className} src={src} alt="@shadcn" /> :
                    <AvatarImage src={"/images/default-avatar.png"} className={cn("object-cover", className)} />
            }
        </>
    )
}
