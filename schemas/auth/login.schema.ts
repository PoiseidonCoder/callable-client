import { TranslationType } from "@/types/schema";
import { z } from "zod";

export const loginFormSchema = (t: TranslationType) => {
    return z.object({
        email: z.string().min(1, { message: t("emailRequire") }).email({ message: t("emailInvalid") }),
        password: z.string().min(1, { message: t("passwordRequire") }).min(6, { message: t("passwordInvalid") }),
    });
}

