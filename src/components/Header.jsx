'use client'
import Link from "next/link";
import Image from "next/image";
import { images } from "@/assets";
import { signIn, useSession, signOut } from "next-auth/react";
export default function Header() {
    const {data: session} = useSession()
    console.log(session)
  return (
    <header className="shadow-sm sticky border-b top-0 bg-white z-30 p-3">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
            {/* Logo */}
            <Link href='/' className="lg:hidden">
            <Image src={images.instagram} alt="instagram-header" width={40} height={40}/>
            </Link>
            <Link href='/' className="hidden lg:inline-flex">
            <Image src={images.instagram2} alt="instagram-header2" width={96} height={96}/>
            </Link>
            {/* Search input */}
            <input type="text" placeholder="search" className="bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[210px]"/>

            {/* Menu items */}
            {session ?<img src={session.user.image} alt={session.user.name} className="rounded-full cursor-pointer w-10 h-10" onClick={signOut}/>: <button className="font-semibold text-sm text-blue-500" onClick={()=> signIn()}>
                    Log in
                </button>
            }
               
        </div>
    </header>
  )
}
