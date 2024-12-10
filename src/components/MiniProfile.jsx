'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import { images } from "@/assets";
import Image from "next/image";

export const MiniProfile = () => {
    const {data:session} = useSession()
  return (
    <div className="flex items-center justify-between mt-14 scroll-m-14 ">
        <img src={session?.user?.image || "../assets/800px-Instagram_logo_2016.webp"} alt="user image" className="w-14 h-14 rounded-full border p-[2px]"/>
        <div className=" ml-4 flex flex-col justify-center">
            <h2 className="font-bold">{session?.user?.username}</h2>
            <h3>Welcome to Instagram</h3>
        </div>
        {session? (
            <button onClick={signOut} className="text-blue-500 text-sm font-semibold">Sign Out</button>
        ): (
            <button onClick={signIn} className="text-blue-500 text-sm font-semibold">
                Sign In
            </button>
        )}
    </div>
  )
}
