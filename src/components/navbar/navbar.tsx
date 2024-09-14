"use client"
import React, { useState } from 'react'
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { signIn, useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator"
import { Session } from 'inspector/promises';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image';



function Navbar() {
  const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  }

  function setIsOpen(arg0: boolean): void {
    throw new Error('Function not implemented.');
  }

  return (
    <nav>
      <div className="container mx-auto min-h-[6vh] flex items-center justify-between p-2">

        {/* boton de amburguesa palñ celu, opcional y no operativo */}
        {/*<button
          onClick={() => setIsOpen(!open)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>*/}

        {/* Menu Items */}
        <div className="md:flex space-x-4">
          <Link href="/login" className="text-defaultTextColor hover:text-gray-400 font-medium sm:text-lg">
            ¡Comienza ahora!
          </Link>
        </div>

        {/* Logo */}
        <Link href="/">
          <Avatar className="w-11 h-11 sm:w-14 sm:h-14"> 
              <AvatarImage className="w-full h-full object-cover rounder-full" src="/images/Logo_SinBG.png" alt="Logo" />
              <AvatarFallback>Avatar Image</AvatarFallback>
          </Avatar>
        </Link>

        <div className="md:flex space-x-4">
          <Link href="/quienesSomos" className="hover:text-gray-400 font-medium sm:text-lg">
            Sobre nosotros
          </Link>
        </div>
      </div>
      <hr />
    </nav>
  )
}

export default Navbar