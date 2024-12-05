'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "./userFormSchema"
import { Usuario } from "@/interfaces/usuarioInterface";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export function UserForm({user, closeDialog, refreshData}:{user?:Usuario, closeDialog:() => void, refreshData?: () => void}) {
    const [ isLoading, setIsLoading ] = useState(false)
    const { toast } = useToast();
    // Handle Submit
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true)
            const response = await fetch(`/api/crud/users/${user ? user.idUsuario : '' }`, {
                method: user ? 'PATCH' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Error al ${user ? 'actualizar' : 'crear'} el usuario: ${response.statusText}`);
            };
            toast({
                title: "Éxito",
                description: `Usuario ${user ? 'actualizado' : 'creado' } correctamente`,
                variant: "success"
            });
            if (refreshData) { refreshData(); };
            closeDialog();
        } catch (error) {
            console.error("Error en onSubmit:", error);
            const errorMessage = (error instanceof Error) ? error.message : 'Error desconocido';
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    // Se define el formulario
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: useMemo(() => ({
            nombreUsuario: user ? user.nombreUsuario : '',
            apellidoUsuario: user ? user.apellidoUsuario : '',
            correoUsuario: user ? user.correoUsuario : '',
            idRol: user ? user.idRol : 1,
        }), [user]) // Memoiza los valores iniciales
    });

    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
        const target = e.target as HTMLInputElement;
        if (target.tagName === 'INPUT' && target.type === 'text') {
            const length = target.value.length;
            if (length >= 2) {
                setTimeout(() => {
                    target.setSelectionRange(length, length);
                }, 0);
            }
        }
    };
    useEffect(() => {
        if (user){
            const preventTextSelection = (e: MouseEvent) => {
                window.getSelection()?.removeAllRanges(); // Elimina cualquier selección de texto activa
            };

            window.addEventListener('mousemove', preventTextSelection);

            return () => {
                window.removeEventListener('mousemove', preventTextSelection);
            };
        }
    }, []);

    return (
        <div onFocus={handleFocus}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {user ? (
                        <FormItem>
                            <FormLabel>ID</FormLabel>
                                <FormControl>
                                    <Input disabled={true} value={user?.idUsuario}/>
                                </FormControl>
                                <FormDescription>
                                    No puedes editar este campo.
                                </FormDescription>
                            <FormMessage />
                        </FormItem>
                    ) : (
                        ''
                    )}
                    <FormField
                        control={form.control}
                        name="nombreUsuario"
                        render={({ field }) => (
                            <FormItem id="nombreUsuario">
                                <FormLabel>Nombres <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder="e.j Jhon" {...field} onKeyDown={(e) => e.stopPropagation()} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="apellidoUsuario"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Apellidos <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder="e.j Doe" {...field} onKeyDown={(e) => e.stopPropagation()}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="correoUsuario"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Correo <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder="e.j jhon.doe@gmail.com" {...field} onKeyDown={(e) => e.stopPropagation()}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="idRol"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rol <span className="text-red-500">*</span></FormLabel>
                                <Select name="idRol" onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione un Rol" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='1'>1 - Cliente</SelectItem>
                                        <SelectItem value='2'>2 - Administrador</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-row sm:justify-between w-full">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancelar</Button>
                        </DialogClose>
                        { isLoading ? (
                            <LoaderCircle className={`animate-spin text-primary h-8 w-8`}/>
                        ) : (
                            <Button type="submit" variant="default" className="text-background" disabled={isLoading}>{!user ? 'Crear Registro' : 'Actualizar Registro'}</Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    )
};