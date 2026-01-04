import { getCurrentUser } from "@/app/api/user";
import { useQuery } from "@tanstack/react-query";

export default function useMe() {
    return useQuery({
        queryKey: ["me"],
        queryFn: getCurrentUser,
    })
}