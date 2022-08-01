import FacebookProvider from "next-auth/providers/facebook";
import NextAuth from "next-auth"

export default NextAuth({
    pages: {
        signIn:'/auth/signin'
    },
    callbacks: {
        session({ session, token, user }) {
            return session // The return type will match the one returned in `useSession()`
        }
    },
    providers: [
        FacebookProvider({
            clientId: '3373897716187066',
            clientSecret: '0a3763092c9e315c8730c1c389112e7d'
        })
    ]
})