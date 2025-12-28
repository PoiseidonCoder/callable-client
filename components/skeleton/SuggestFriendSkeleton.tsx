"use client"

import { useMemo } from "react"
import useMeasure from "react-use-measure"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

const MIN_WIDTH = 200
const GAP = 12
const ROWS = 3
const FALLBACK_COUNT = 6

export const SuggestFriendSkeleton = () => {
    const [ref, { width }] = useMeasure()

    const count = useMemo(() => {
        if (!width) return FALLBACK_COUNT
        const columns = Math.max(Math.floor(width / (MIN_WIDTH + GAP)), 1)
        return columns * ROWS
    }, [width])

    return (
        <div
            ref={ref}
            className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"
        >
            {Array.from({ length: count }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                    <CardHeader className="p-0">
                        <Skeleton className="w-full aspect-4/5" />
                    </CardHeader>

                    <CardContent className="p-2 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-9 w-full" />
                        <Skeleton className="h-9 w-full" />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
