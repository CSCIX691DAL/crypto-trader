import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import MD5 from 'crypto-js/md5'
import encoder from 'crypto-js/enc-hex'

import { createUser, getUser } from '../../../services/user'

export default NextAuth({

    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Providers.Credentials({
            name: "Username and Password",
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password'}
            },
            async authorize(credentials, req) {
                const hashUsername = MD5(credentials.username).toString(encoder);
                const hashPassword = MD5(credentials.password).toString(encoder);
                const res = await getUser(hashUsername);

                if (res.data != '' && res.data.password == hashPassword) { // user found in db
                    const user = { id: hashUsername, name: res.data.name, email: res.data.email }
                    return user;
                }
            }
        })
    ],
    theme: "light",
    session: {
        jwt: true, 
    },
    // A database is optional, but required to persist accounts in a database
    // database: process.env.DATABASE_URL,
})