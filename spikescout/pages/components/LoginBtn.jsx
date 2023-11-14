import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginBtn() {
    const { data: session, status } = useSession();
    console.log(session);
    

    return (
        <>
            <button onClick={() => signIn("github")}>Sign in with GitHub</button>
        </>
    )
}