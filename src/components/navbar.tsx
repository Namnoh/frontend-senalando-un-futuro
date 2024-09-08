"use client"
import React from 'react'
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { signIn, useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator"
import { Session } from 'inspector/promises';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



function Navbar() {

  const {data: Session} = useSession()
  console.log("error")
  console.log(Session)
  
  return (
    <nav className='bg-slate-700 py-3 flex justify-between px-5 text-white items-center'>
        <h1>
            Señalando un futuro
        </h1>
        <div>
            <Button className='bg-white text-black px-6 py-2 rounded' variant="outline" onClick={() => signIn('google') }>Inicia sesion con Google</Button>
        </div>
    </nav>
  )
}

export default Navbar