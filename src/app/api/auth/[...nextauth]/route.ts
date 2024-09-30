import { nextAuthOptions } from "@/app/auth-options/auth";
import NextAuth from "next-auth";

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
