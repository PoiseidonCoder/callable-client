import { TranslationType } from "@/types/schema";
import { z } from "zod";
type Data = {
    password: string;
    confirmPassword: string;
}

export const registerFormSchema = (t: TranslationType) => {
    return z.object({
        email:
            z.string().min(1, { message: t("emailRequire") })
                .email({ message: t("emailInvalid") }),
        password:
            z.string().min(1, { message: t("passwordRequire") })
                .min(6, { message: t("passwordInvalid") }),
        confirmPassword:
            z.string().min(1, { message: t("confirmPasswordRequire") })
                .min(6, { message: t("confirmPasswordInvalid") }),
    }).refine(
        (data) => data.password === data.confirmPassword,
        {
            message: t("samePassword"),
            path: ["confirmPassword"],
        }
    )

}