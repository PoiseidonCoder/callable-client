'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginSchema } from '@/schemas/auth.schema';
import { AuthRequest } from '@/types/user';
import useLogin from '@/libs/hooks/use-login';

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm({
        resolver: zodResolver(loginSchema()),
        defaultValues: { email: '', password: '' },
    });

    const { mutateAsync: loginMutate, isPending: isLogging } = useLogin();
    const onSubmit = async (authRequestDto: AuthRequest): Promise<void> => {
        await loginMutate(authRequestDto);
    };

    return (
        <div className='space-y-6'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-sm font-semibold'>Email:</FormLabel>
                                <FormControl>
                                    <Input
                                        type='email'
                                        placeholder="Enter your email"
                                        className='h-12 rounded-xl border-border/60 bg-background/50 focus:bg-background transition-colors'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-sm font-semibold'>Password:</FormLabel>
                                <FormControl>
                                    <div className='relative'>
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                            className='h-12 rounded-xl border-border/60 bg-background/50 focus:bg-background transition-colors pr-12'
                                            {...field}
                                        />
                                        <Button
                                            type='button'
                                            variant='ghost'
                                            size='sm'
                                            className='absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-accent/50'
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type='submit'
                        className='w-full h-12 rounded-xl from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-200'
                        disabled={isLogging}
                    >
                        {isLogging ? (
                            <div className='flex items-center gap-2'>
                                <div className='w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin' />
                                Logging in...
                            </div>
                        ) : (
                            <div>
                                Login
                            </div>
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
