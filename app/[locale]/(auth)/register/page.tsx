"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginRequestDto } from "@/types/auth/login";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl"
import { useState } from "react"
import { Eye, EyeOff, Ghost } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { AUTH_ROUTES } from "@/constants/route";
import { Label } from "@radix-ui/react-label";
import { GoogleButton } from "@/components/ui/google-button";
import { registerFormSchema } from "@/schemas/auth/register.schema";
import { signIn } from "next-auth/react";
import { RegisterRequestDto } from "@/types/auth/register";
import useRegister from "@/hooks/use- register";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";

const RegisterPage = () => {

    const t = useTranslations("RegisterPage");
    const { mutateAsync: register, isPending } = useRegister();
    const router = useRouter();
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState<boolean>(false);

    const form = useForm({
        resolver: zodResolver(registerFormSchema(t)),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const onSubmit = async (registerRequestDto: RegisterRequestDto) => {
        try {
            await register(registerRequestDto);
            toast.info(t("registerSuccess"));
            router.push("/login")
        } catch (error) {
            toast.error(t("registerFailed"))
        }
    }

    return (
        <Card className="w-[384px] opacity-95">
            <CardHeader>
                <CardTitle className="text-center text-3xl">
                    {t("register")}
                </CardTitle>
                <CardDescription>
                    {t("description")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("email")}</FormLabel>
                                    <FormControl>
                                        <Input type="email" className="py-5" placeholder={t("emailPlaceholder")}  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("password")}</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input className="py-5" type={isShowPassword ? "text" : "password"} placeholder={t("passwordPlaceholder")} {...field} />
                                            <Button type="button" className="absolute top-0 right-1 cursor-pointer hover:bg-transparent" variant={"ghost"} onClick={() => setIsShowPassword(!isShowPassword)}>
                                                {isShowPassword ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("confirmPassword")}</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input className="py-5" type={isShowConfirmPassword ? "text" : "password"} placeholder={t("confirmPasswordPlaceholder")} {...field} />
                                            <Button type="button" className="absolute top-0 right-1 cursor-pointer hover:bg-transparent" variant={"ghost"} onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}>
                                                {isShowConfirmPassword ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full mt-3 py-2 bg-blue-700">
                            {isPending ? "Registering..." : t("register")}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <GoogleButton onClick={() => signIn("google")} >{t("google")}</GoogleButton>
                <Label >
                    <Link className="text-muted-foreground" href={AUTH_ROUTES.LOGIN} >
                        {t("haveAccount")}
                        <span className="text-foreground">
                            &nbsp;{t("suggestLogin")}
                        </span></Link>
                </Label>
            </CardFooter>
        </Card >
    )
}

export default RegisterPage