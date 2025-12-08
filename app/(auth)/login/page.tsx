import { LoginForm } from "@/components/common/forms/authForms/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleButton } from "@/components/ui/google-button";
import { AUTH_ROUTES } from "@/constants/routes";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";


const LoginPage = () => {
  return (
    <div
      className="flex min-h-screen justify-center items-center bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('./bg-auth.jpg')" }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl text-center">Login</CardTitle>
          <CardDescription>Please Enter your account to using application</CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleButton />
          <LoginForm />
          <Separator className="bg-border/60" />
          <div className="pt-2 text-end text-muted-foreground">
            Not registered yet?
            <Link className="text-foreground" href={AUTH_ROUTES.REGISTER}>Click here to Register</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
