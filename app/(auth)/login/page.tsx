import { LoginForm } from "@/components/common/forms/authForms/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleButton } from "@/components/ui/google-button";
import { AUTH_ROUTES } from "@/constants/routes";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div
      className="flex justify-center items-center min-h-screen pg-4 bg-cover bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('bg-auth.jpg')" }}
    >
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border border-border/60 rounded-3xl backdrop-blur-sm bg-card/80">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-3xl font-bold from-foreground to-foreground/80 bg-clip-text">
              Login
            </CardTitle>
            <CardDescription className="text-muted-foreground text-lg">
              Welcome back! Please enter your credentials to access your account.
            </CardDescription>
            <GoogleButton />
          </CardHeader>
          <CardContent className="space-y-6">
            <LoginForm />
            <div className="relative">
              <Separator className="bg-border/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className=" px-4 text-sm text-muted-foreground font-medium rounded-2xl">
                  Not registered yet?
                  <Link
                    href={AUTH_ROUTES.REGISTER}
                    className="font-semibold text-primary hover:text-primary/80 transition-colors underline underline-offset-2 "
                  >
                    Click here to Register
                  </Link>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default LoginPage;
