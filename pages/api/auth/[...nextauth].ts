import FacebookProvider from "next-auth/providers/facebook";
import NextAuth from "next-auth"
import { NextApiRequest, NextApiResponse } from "next";

// export default NextAuth({

//     pages: {
//         signIn:'/auth/signin'
//     },
//     callbacks: {
//         session({ session, token, user }) {
//             return session // The return type will match the one returned in `useSession()`
//         }
//     },
//     providers: [
//         FacebookProvider({
//             clientId: '3373897716187066',
//             clientSecret: '0a3763092c9e315c8730c1c389112e7d'
//         })
//     ]
// })


export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, {
        // adapter: PrismaAdapter(prisma),
        providers: [
            FacebookProvider({
                clientId: '3373897716187066',
                clientSecret: '0a3763092c9e315c8730c1c389112e7d'
            })
        ],
        pages: {
            signIn: '/auth/signin'
        },
        secret: process.env.SECRET,
        debug: process.env.NODE_ENV === 'development',
        callbacks: {
            // async signIn({ user, account, profile, email, credentials }) {
            //     const isAllowedToSignIn = user.email === process.env.ADMIN_EMAIL
            //     if (isAllowedToSignIn) {
            //         return true
            //     } else {
            //         // Return false to display a default error message
            //         return false
            //         // Or you can return a URL to redirect to:
            //         // return '/unauthorized'
            //     }
            // },
            session({ session, token, user }) {
                if (token) {
                    session.id = token.id;
                }
                return session; // The return type will match the one returned in `useSession()`
            }
        },
        // events:{
        //     signIn:({user,account,profile,isNewUser})=>{
        //         console.log('user',user);
        //         console.log('account',account);
        //         console.log('profile',profile);
        //         console.log('isNew USer',isNewUser);

        //     }
        // }

    })
}