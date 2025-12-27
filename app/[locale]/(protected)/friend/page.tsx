"use client"

import { Button } from "@/components/ui/button"
import { useGetSuggestFriendInfinite } from "@/hooks/queries/use-get-suggest-friend"
import { FriendShipUserResponseDto } from "@/types/friend"

const FriendPage = () => {
    const pageSize = 3

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetSuggestFriendInfinite(pageSize)

    if (isLoading) return <div>Loading...</div>

    const friends: FriendShipUserResponseDto[] =
        data?.pages.flatMap((page) => page.data) ?? []

    return (
        <div className="space-y-3">
            {friends.map((user) => (
                <div
                    key={user.id}
                    className="flex items-center gap-3 rounded-md border p-3"
                >
                    <img
                        src={user.avatar}
                        alt={user.fullName}
                        className="h-10 w-10 rounded-full object-cover"
                    />
                    <span className="font-medium">{user.fullName}</span>
                </div>
            ))}

            <Button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
            >
                {isFetchingNextPage ? "Loading..." : "Load more"}
            </Button>
        </div>
    )
}

export default FriendPage
