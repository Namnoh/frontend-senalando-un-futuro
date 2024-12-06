"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation' // Importamos useRouter para redirigir al usuario
import { InfoCapsule } from '@/components/customUI/InfoCapsule'

// Definir el esquema de validación con zod
const formSchema = z.object({
  email: z.string().email({ message: 'Debe ser un correo electrónico válido' }),
})

export default function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter() 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  // Función para manejar el submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast({
          title: 'Correo enviado',
          description: data.message || 'Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña.',
        });
        form.reset();
        router.push('/')
      } else {
        throw new Error(data.error || 'Ha ocurrido un error');
      }
    } catch (error) {
      if (error instanceof Error) {
        // Si el error es "Correo electrónico no registrado"
        if (error.message.includes('Correo electrónico no registrado')) {
          toast({
            title: 'Error',
            description: 'El correo electrónico no está registrado en nuestro sistema.',
            variant: 'destructive',
          });
        } else if (error.message.includes('No se pudo conectar con el servidor')) {
          toast({
            title: 'Error de conexión',
            description: 'No pudimos contactar al servidor. Por favor, intenta de nuevo más tarde.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-1 sm:gap-6 lg:flex-wrap min-h-screen border-white">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Restablecer contraseña</CardTitle>
          <div className='flex flex-row items-center gap-4'>
          <CardDescription className="text-center">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña 
          </CardDescription>
            <InfoCapsule message="Si no ves el correo en la bandeja de entrada\nasegurate de revisar la bandeja de SPAM"></InfoCapsule>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="tu@ejemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar correo'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
