"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { signIn, signOut, useSession } from "next-auth/react";
import { Session } from 'inspector/promises';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import  Image  from "next/image";



function Login() {
  
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="grid grid-cols-9 grid-rows-7 gap-1">
        <div className="col-span-3 row-span-7 col-start-2">
          <Image
            className="rounded-full"
            src="https://i.gifer.com/origin/3f/3f902c487567cbb8201d619bbc6b5af2.gif"
            alt=""
            width={400}
            height={400}
          />
        </div>
        <>
          {session?.user ? (
            <>
              <div className="col-span-3 row-span-7 col-start-6 row-start-4 flex justify-center">
                <Button className="bg-white text-black rounded-full items-center" variant="outline" onClick={() => signOut()}>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://static.vecteezy.com/system/resources/previews/000/574/782/original/vector-logout-sign-icon.jpg" />
                  </Avatar>
                  <span className="px-1">Cerrar sesión</span>
                </Button>
              </div>
              <div className="col-span-3 row-span-7 col-start-6 row-start-5 flex justify-center">
                <p>{session.user.name} </p>
                {/* <Avatar className="w-8 h-8 rounded-full">
                  <AvatarImage src={session.user.image}/>
                </Avatar> */}
              </div>
              <div className=" text-red-600 col-span-3 row-span-7 col-start-6 row-start-6 flex justify-center">
                <p>{session.user.email}</p>
              </div>
              <div className=" text-red-600 col-span-3 row-span-7 col-start-6 row-start-7 flex justify-center">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={session.user.image!}/> {/* Funciona igual dejenlo */}
                </Avatar>
              </div>
            </>
          ) : (
            <div className="col-span-3 row-span-7 col-start-6 row-start-4 flex justify-center">
              <Button className="bg-white text-black rounded-full items-center" variant="outline" onClick={() => signIn('google')}>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://pngimg.com/uploads/google/google_PNG19635.png" />
                </Avatar>
                <span className="px-1">Inicia sesión con Google</span>
              </Button>
            </div>
          )}
        </>
      </div>
    </div>
  );  
}

export default Login