import { postRegister } from "@/app/api/auth";
import { RegisterRequestDto } from "@/types/auth/register";
import { useMutation } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";

export default function useRegister() {
    return useMutation<void, ApiError, RegisterRequestDto>({
        mutationFn: postRegister,
    })
}