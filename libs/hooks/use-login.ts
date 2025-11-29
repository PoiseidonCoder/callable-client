import { ApiError } from "@/types/axios";
import { AuthRequest } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useLogin() {
  const router = useRouter();

  return useMutation<void, ApiError, AuthRequest>({
    mutationFn: async (payload) => {
      await signIn("credentials", {
        redirect: false,
        email: payload.email,
        password: payload.password,
      });
    },

    onSuccess: () => {
      toast.success("Login successful!");
      router.push("/");
      router.refresh();
    },

    onError: (error) => {
      toast.error(error.message || "Login failed");
    },
  });
}
