"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useLogin from "@/libs/hooks/use-login";
import { loginSchema } from "@/schemas/auth.schema";
import { AuthRequest } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function LoginForm() {
  //State
  const [showPassword, setShowPassword] = useState<boolean>(false);
  //Mutation
  const { mutateAsync: loginMutate, isPending: isLogging } = useLogin();
  const [logingTest, setLogingTest] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(loginSchema()),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = async (authRequest: AuthRequest) => {
    // await loginMutate(authRequest);
    setInterval(function () {
      console.log("mvt");

    }, 50000)
    setLogingTest(true);
  }

  return (
    <div >
      <Form {...form}>
        <form className="min-w-sm  space-y-5 mt-5" onSubmit={form.handleSubmit(onSubmit)} >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl >
                  <Input type="email" placeholder="Enter your email here"  {...field} />
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
                <FormLabel>Password:</FormLabel>
                <FormControl className="relative" >
                  <div>
                    <Input type={showPassword ? "text" : "password"} placeholder="Enter you password " {...field} />
                    <Button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      variant={"ghost"}
                      className="absolute top-1/2 right-1 -translate-y-1/2 hover:accent-accent/50 "
                    >
                      {showPassword ? <Eye className="size-4" /> : <EyeClosed className="size-4" />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full " type="submit" disabled={logingTest}>{logingTest ?
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" ></div>
              <span>Logging in...</span>
            </div>
            :
            <div className="cursor-pointer w-full">Login</div>}</Button>
        </form>
      </Form>
    </div>
  );
}

