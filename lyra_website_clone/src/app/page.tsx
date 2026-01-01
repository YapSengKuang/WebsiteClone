'use client'

import GoogleButton from "react-google-button";
import {signIn} from "next-auth/react"

export default function Home() {
  
  return (
   <main className="p-10">
    <h1>Home</h1>
    <GoogleButton onClick={() => signIn('google')}className="mx-auto mt-16"/>
   </main>
  );
}
