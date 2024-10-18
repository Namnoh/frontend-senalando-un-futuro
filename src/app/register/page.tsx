'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form";
import styles from "@/app/styles/auth.module.scss"
import { headers } from "next/headers"
import { Usuario } from "@/interfaces/usuarioInterface"
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const { register, handleSubmit, formState:{errors} } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {

    if (data.contrasenaUsuario != data.confirmPassword) {
      console.log(data.contrasenaUsuario)
      console.log(data.confirmPassword)
      return alert("Las contraseñas no son iguales")
    }
    
    const res = await fetch('/api/auth/register/',{ 
      method: 'POST',
      body: JSON.stringify({
        nombreUsuario: data.nombreUsuario,
        apellidoUsuario: data.apellidoUsuario,
        correoUsuario: data.correoUsuario,
        contrasenaUsuario: data.contrasenaUsuario
      }),
      headers: {
        'Content-Type' : 'applicacion/json'
      }
    })
    if (!res.ok) {
      console.log("malardo bro")
      //router.push('/')
    }
    router.push('/login')
    const resJSON = await res.json()
    console.log(resJSON) 
  });


  return (
    <div className={styles.backgroundImageRegister}>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-5 sm:gap-6 md:justify-evenly lg:flex-wrap h-[100vh] p-4">
        <div>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle className="text-center">Registrarse</CardTitle>
              <CardDescription className="text-center">
                Crea una nueva cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input 
                      type="text"
                      { ... register("nombreUsuario", {required: true})} 
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input 
                      type="text"
                      { ... register("apellidoUsuario", {required: true})}  
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input 
                      type="email"
                      { ... register("correoUsuario", {required: true})}  
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input 
                      type="password"
                      { ... register("contrasenaUsuario", {required: true})} 
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                    <Input 
                      type="password"
                      { ... register("confirmPassword", {required: false})} 
                    />
                  </div>
                </div>
                <Button className="w-full mt-4">Registrarse</Button>
              </form>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    O continúa con
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <svg
                  className="mr-2 h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Registrarse con Google
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Inicia sesión
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
        <div>
          <div className="hidden md:block bg-white outline w-[500px] h-[500px] rounded-full"></div>
        </div>
      </div>
    </div>
  );
}