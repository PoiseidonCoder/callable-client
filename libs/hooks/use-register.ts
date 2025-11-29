import { fetchRegister } from "@/app/api/auth/auth";
import { ApiError } from "@/types/axios";
import { AuthRequest } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useRegister() {
  const router = useRouter();

  return useMutation<void, ApiError, AuthRequest>({
    mutationFn: async (payload) => {
      await fetchRegister({
        email: payload.email,
        password: payload.password,
      });
    },

    onSuccess: () => {
      toast.success("Resgistration successful!");
      router.push("/");
    },

    onError: (error) => {
      toast.error(error.message || "Registration failed");
    },
  });
}
