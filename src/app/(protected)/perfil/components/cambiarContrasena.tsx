'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
    currentPassword: z.string().min(1, "La contraseña actual es requerida"),
    newPassword: z  
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula." })
    .regex(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula." })
    .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." })
    .regex(/[^A-Za-z0-9]/, { message: "La contraseña debe contener al menos un carácter especial." }),
    confirmPassword: z.string().min(1, "Confirma tu nueva contraseña"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las nuevas contraseñas no coinciden",
    path: ["confirmPassword"],
})

type FormValues = z.infer<typeof formSchema>

export default function ChangePassword() {
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        },
    })

    const onSubmit = async (values: FormValues) => {
        if (!session?.user?.id) {
        toast({
            title: "Error",
            description: "No se pudo obtener la información del usuario. Por favor, inicia sesión nuevamente.",
            variant: "destructive",
        })
        return
        }

    setIsLoading(true)

        try {
        const response = await fetch('/api/perfil/changePassword', {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            currentPassword: values.currentPassword,
            newPassword: values.newPassword
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Error al cambiar la contraseña')
        }

        toast({
            title: "Éxito",
            description: "Tu contraseña ha sido cambiada exitosamente.",
        })
        form.reset()
        } catch (error) {
        toast({
            title: "Error",
            description: error instanceof Error ? error.message : 'Ocurrió un error al cambiar la contraseña.',
            variant: "destructive",
        })
        } finally {
        setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className=" sm:text-xl lg:text-xl text-lg  text-black">Contraseña Actual</FormLabel>
                        <FormControl>
                            <Input  className="border-black" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className=" sm:text-xl lg:text-xl text-lg  text-black" >Nueva Contraseña</FormLabel>
                        <FormControl>
                            <Input className="border-black" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className=" sm:text-xl lg:text-xl text-lg  text-black">Confirmar Nueva Contraseña</FormLabel>
                        <FormControl>
                            <Input  className="border-black" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Cambiando...' : 'Cambiar Contraseña'}
                </Button>
            </form>
        </Form>
    )
}