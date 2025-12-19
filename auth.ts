import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { postLogin } from "./app/api/auth";
import { LoginResponseDto } from "./types/auth/login";

export const { handlers, auth, signIn, signOut } = NextAuth({

    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        Credentials({

            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string,
                    password: string
                }

                if (!email || !password) return null;

                const user: LoginResponseDto = (await postLogin({ email, password, }));

                if (!user) return null

                return {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                }
            }
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },

        session({ session, token }) {
            session.user.role = token.role
            session.user.id = token.id
            return session
        },
    },

    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET
})
