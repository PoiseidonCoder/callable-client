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
                    fullName: loginResponseDto.user.fullName,
                    role: loginResponseDto.user.role,
                    avatar: loginResponseDto.user.avatar,
                    accessToken: loginResponseDto.accessToken,
                    accessTokenExpiresTime: loginResponseDto.accessTokenExpiresTime,
                    refreshToken: loginResponseDto.refreshToken,
                    refreshTokenExpiresTime: loginResponseDto.accessTokenExpiresTime
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                token.id = user.id
                token.email = user.email
                token.fullName = user.fullName
                token.role = user.role
                token.avatar = user.avatar
                token.accessToken = user.accessToken
                token.accessTokenExpiresTime = user.accessTokenExpiresTime
                token.refreshToken = user.refreshToken
                token.refreshTokenExpiresTime = user.refreshTokenExpiresTime
            }
            if (Date.now() > token.accessTokenExpiresTime && Date.now() < token.refreshTokenExpiresTime) {
                const newToken = await postRefreshToken(token);
                return { ...token, ...newToken }
            }

            return token;
        },

        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id
                session.user.email = token.email
                session.user.fullName = token.fullName
                session.user.role = token.role
                session.user.avatar = token.avatar
            }

            session.accessToken = token.accessToken
            session.accessTokenExpiresTime = token.accessTokenExpiresTime
            session.refreshToken = token.refreshToken
            session.refreshTokenExpiresTime = token.refreshTokenExpiresTime

            return session;
        },
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                const idToken = account.id_token;
                if (!idToken) { return false; }
                const loginGoogleResponse = await postLoginGoogle({ idToken, });
                user.id = loginGoogleResponse.user.id;
                user.email = loginGoogleResponse.user.email;
                user.fullName = loginGoogleResponse.user.fullName;
                user.role = loginGoogleResponse.user.role;
                user.avatar = loginGoogleResponse.user.avatar;
                user.accessToken = loginGoogleResponse.accessToken;
                user.accessTokenExpiresTime =
                    loginGoogleResponse.accessTokenExpiresTime;
                user.refreshToken = loginGoogleResponse.refreshToken;
                user.refreshTokenExpiresTime =
                    loginGoogleResponse.refreshTokenExpiresTime;
            }
            return true;
        }
    },

    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET
})
