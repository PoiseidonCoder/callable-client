import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { postLogin, postLoginGoogle, postRefreshToken } from "./app/api/auth";
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

                const loginResponseDto: LoginResponseDto = (await postLogin({ email, password, }));

                if (!loginResponseDto) return null;

                return {
                    id: loginResponseDto.user.id,
                    email: loginResponseDto.user.email,
                    role: loginResponseDto.user.role,
                    avatar: loginResponseDto.user.avatar,
                    accessToken: loginResponseDto.accessToken,
                    accessTokenExpiresAt: loginResponseDto.accessTokenExpiresAt,
                    refreshToken: loginResponseDto.refreshToken,
                    refreshTokenExpiresAt: loginResponseDto.accessTokenExpiresAt
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                token.id = user.id
                token.role = user.role
                token.avatar = user.avatar
                token.email = user.email
                token.accessToken = user.accessToken
                token.accessTokenExpiresAt = user.accessTokenExpiresAt
                token.refreshToken = user.refreshToken
                token.refreshTokenExpiresAt = user.refreshTokenExpiresAt
            }
            if (Date.now() > token.accessTokenExpiresAt) {
                const newToken = await postRefreshToken(token);
                return { ...token, ...newToken }
            }

            return token;
        },

        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id
                session.user.email = token.email
                session.user.role = token.role
                session.user.avatar = token.avatar
            }

            session.accessToken = token.accessToken
            session.accessTokenExpiresAt = token.accessTokenExpiresAt
            session.refreshToken = token.refreshToken
            session.refreshTokenExpiresAt = token.refreshTokenExpiresAt

            return session;
        },
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                const idToken = account.id_token;
                if (!idToken) {
                    console.error("Google id_token not found");
                    return false;
                }
                const loginGoogleResponse = await postLoginGoogle({ idToken, });
                user.id = loginGoogleResponse.user.id;
                user.email = loginGoogleResponse.user.email;
                user.role = loginGoogleResponse.user.role;
                user.accessToken = loginGoogleResponse.accessToken;
                user.accessTokenExpiresAt =
                    loginGoogleResponse.accessTokenExpiresAt;
                user.refreshToken = loginGoogleResponse.refreshToken;
                user.refreshTokenExpiresAt =
                    loginGoogleResponse.refreshTokenExpiresAt;
            }
            return true;
        }
    },

    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET
})
