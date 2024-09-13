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
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Avatar className="w-24 h-24"> 
              <AvatarImage className="w-full h-full object-cover rounder-full" src="/images/Logo_SinBG.png" alt="Logo" />
              <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        
            
        </Link>

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
          <Link href="/login"
            className="text-white hover:text-gray-400">¡Comienza ahora!
          </Link>
        </div>
        <div className="md:flex space-x-4">
          <Link href="/quienesSomos"
            className="text-white hover:text-gray-400">Sobre nosotros
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar