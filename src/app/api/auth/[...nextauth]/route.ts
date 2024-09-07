import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = nextAuth({
providers: [GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENTE_SECRET as string,
})],   
});

export { handler as GET, handler as POST}