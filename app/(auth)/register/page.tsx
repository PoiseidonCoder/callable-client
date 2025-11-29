
import { RegisterForm } from '@/components/common/forms/authForms/register-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { GoogleButton } from '@/components/ui/google-button';
import { AUTH_ROUTES } from '@/constants/routes';
import { Separator } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';

const RegisterPage = () => {

    return (
        <div
            className='min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat bg-fixed'
            style={{ backgroundImage: "url('/background.jpg')" }}
        >
            <div className='w-full max-w-md'>
                <Card className='shadow-2xl border border-border/60 rounded-3xl backdrop-blur-sm bg-card/80'>
                    <CardHeader className='text-center space-y-4 pb-6'>
                        <CardTitle className='text-3xl font-bold  from-foreground to-foreground/80 bg-clip-text'>
                            Create an Account
                        </CardTitle>
                        <CardDescription className='text-muted-foreground text-lg'>
                            Join us today! Fill in the details below to get started.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className='space-y-6'>
                        <GoogleButton />
                        <div className="relative">
                            <Separator className="bg-border/60" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="bg-card px-4 text-sm text-muted-foreground font-medium">
                                    Or continue with email
                                </span>
                            </div>
                        </div>
                        <RegisterForm />
                    </CardContent>

                    <CardFooter className='pt-0 pb-8'>
                        <div className='w-full text-center'>
                            <p className='text-sm text-muted-foreground'>
                                Do you have an account?
                                <Link
                                    href={AUTH_ROUTES.LOGIN}
                                    className='font-semibold text-primary hover:text-primary/80 transition-colors underline underline-offset-2'
                                >
                                    Click here to Login
                                </Link>
                            </p>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

export default RegisterPage;