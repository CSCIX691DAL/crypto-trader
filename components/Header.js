import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Header() {
    const [ session, loading ] = useSession()

    return(
        <>
            <div className="px-auto py-4 bg-blue-500 text-white flex ">
                <div className="text-4xl px-4">
                    CryptoTrader
                </div>
                <div className="flex my-2">
                    <div className="text-xl px-4 flex">
                        <Link href="/">
                            <a>Browse</a>
                        </Link>
                    </div>
                    <div className="text-xl px-4 flex">
                        <Link href="/convert">
                            <a>Convert</a>
                        </Link>
                    </div>
                    <div className="text-xl px-4 flex">
                        <Link href="/portfolio">
                            <a>Portfolio</a>
                        </Link>
                    </div>
                </div>
                <div className="flex-grow"></div>
                <div>
                    {!session && <>
                        <span className="mr-4">Not signed in</span>
                        <button onClick={() => signIn()} className="text-black bg-white hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 p-2 mr-4 rounded-xl">Sign in</button>
                    </>}
                    {session && <>
                        <span className="mr-4">{session.user.name}</span>
                        <button onClick={() => signOut()} className="text-black bg-white hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 p-2 mr-4 rounded-xl">Sign out</button>
                    </>}
                </div>
            </div>
        </>
    )
}