"use client"
import React from 'react'
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react";
import { Separator } from "@/components/ui/separator"

function Navbar() {
  return (
    <nav className='bg-slate-700 py-2 flex justify-between px-5 text-white items-center'>
        <h1>
            Señalando un futuro
        </h1>
        <div>
            <Button className='px-6 py-2 rounded' variant="outline" onClick={() => signIn() }>Inicia sesion</Button>
        </div>
    </nav>
  )
}

export default Navbar