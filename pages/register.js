import Link from 'next/link'
import * as React from 'react'
import MD5 from 'crypto-js/md5'
import encoder from 'crypto-js/enc-hex'
import { getAllUserIDs, createUser } from '../services/user'
import { execOnce } from 'next/dist/next-server/lib/utils'

export default function Register() {
    const [ firstName , setFirstName ] = React.useState(1);
    const [ lastName , setLastName ] = React.useState(2);
    const [ username, setUsername ] = React.useState(3);
    const [ password, setPassword ] = React.useState(4);
    const [ confirmPassword, setConfirmPassword ] = React.useState(5);
    const [ error, setError ] = React.useState(6);

    const validateForm = (first, last, user, pass, confirm) => {
        if (!first || first.length < 1) {
            setError("First name cannot be empty");
        } 
        else if (!first || last.length < 1) {
            setError("Last name cannot be empty");
        } 
        else if (!user || user.length < 8 || user.length > 24) {
            setError("Username must be between 8 and 24 characters");
        } 
        else if (!pass || pass.length < 8 || pass.length > 128) {
            setError("Password must be between 8 and 128 characters");
        }
        else if (!confirm || pass != confirm) {
            setError("Passwords must match");
        }

        const credentials = {
            name: first + " " + last,
            username: user,
            password: pass
        }
        
        setError("");
        submit(credentials);
    }

    const submit = async (credentials) => {
        const existingUsers = await getAllUserIDs();
        const hash = MD5(credentials.username).toString(encoder);

        if (!existingUsers.includes(hash)) {
            const hashPassword = MD5(password).toString(encoder);
            const res = await createUser(hash, credentials.username, credentials.name, hashPassword);
            alert(res ? "User was successfully registered" : "Error registering user");
        }
        else {
            setError("User already exists with that username");
        }
    }

    return (
        <section className="flex flex-col md:flex-row h-screen items-center">
            <div
                className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
                        flex items-center justify-center"
            >
                <div className="w-full h-100">
                    <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
                        Create an account
                    </h1>

                    <form className="mt-6">
                        <div className="flex flex-col md:flex-row pb-4 justify-between">
                            <div>
                                <label className="block text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="Enter First Name"
                                    className="w-full lg:w-11/12 px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none flex justify-end"
                                    autoFocus
                                    required
                                    onChange={event => setFirstName(event.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    placeholder="Enter Last Name"
                                    className="w-full lg:w-11/12 px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                    autoFocus
                                    required
                                    autoComplete="new-password"
                                    onChange={event => setLastName(event.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter Username"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                autoFocus
                                required
                                autoComplete="new-password"
                                onChange={event => setUsername(event.target.value)}
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter Password"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                                    focus:bg-white focus:outline-none"
                                required
                                autoComplete="new-password"
                                onChange={event => setPassword(event.target.value)}
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Enter Password"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                                    focus:bg-white focus:outline-none"
                                required
                                autoComplete="new-password"
                                onChange={event => setConfirmPassword(event.target.value)}
                            />
                        </div>

                        <div className="text-red-600 pt-3">
                            {(error && error.length > 0) ? error : ""}
                        </div>
                        

                        <button
                            className="w-full block bg-blue-500 hover:bg-blue-300 focus:bg-blue-300 text-white font-semibold rounded-lg
                        px-4 py-3 mt-6"
                            type="button"
                            onClick={() => validateForm(firstName, lastName, username, password, confirmPassword)}
                        >
                            Register
                        </button>
                    </form>

                    <hr className="my-6 border-gray-300 w-full" />

                    <h2 className="my-4 flex items-center justify-center flex-col">
                        <Link href="/">
                            <p className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer">
                                Go back to Dashboard
                            </p>
                        </Link>
                    </h2>
                </div>
            </div>
        </section>
    )
}

