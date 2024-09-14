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
    <div className='flex flex-col lg:flex-row items-center justify-center gap-20 md:justify-evenly lg:flex-wrap h-[75vh]'>
      <section className=''>
        <Image
          className="rounded-full w-[30vh] md:w-[35vh] aspect-square"
          src="https://i.gifer.com/origin/3f/3f902c487567cbb8201d619bbc6b5af2.gif"
          alt=""
          width={0}
          height={0}
        />
      </section>
      {session?.user ? (
        <>
          <section className=''> 
          </section>
        </>
        ) : (
          <div className="">
            <Button className="rounded-full" variant="outline" onClick={() => signIn('google')}>
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://pngimg.com/uploads/google/google_PNG19635.png" />
              </Avatar>
              <span className="px-1">Inicia sesión con Google</span>
            </Button>
          </div>
        )
      }
    </div>
  );
}

export default Login