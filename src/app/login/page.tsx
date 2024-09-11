"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { signIn, useSession } from "next-auth/react";
import { Session } from 'inspector/promises';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



function Login() {
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    signIn('google');
  };
  return (
    <>
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <div className="grid grid-cols-9 grid-rows-7 gap-1">
        <div className="col-span-3 row-span-7 col-start-2">
          Aca va el logo o la foto nose 
        </div>

        <div className="col-span-3 row-span-7 col-start-6">
          <Button className='bg-white text-black px-1 py-2 rounded flex items-center space-x-2' variant="outline" onClick={handleSignIn}>
            <Avatar className='w-8 h-8'>
              <AvatarImage src="https://pngimg.com/uploads/google/google_PNG19635.png" />
            </Avatar>
            <span className='px-2'>Inicia sesión con Google</span>
          </Button>
        </div>
      </div>
    </div>    
    </>
  )
}

export default Login