import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
    accessToken?: string;
    refreshToken?: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}

// {
//   "user": {
//     "id": "123",
//     "name": "Nguyen Van A",
//     "email": "vana@example.com",
//     "image": "https://example.com/avatar.png"
//   },
//   "accessToken": "abc.def.ghi",
//   "refreshToken": "xyz-123",
//   "expires": 1696000000
// }
