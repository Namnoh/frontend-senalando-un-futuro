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
import { formSchema } from "./categoryFormSchema";
import { Categoria } from "@/interfaces/categoriaInterface";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

export function CategoryForm({category, closeDialog, refreshData}:{category?:Categoria, closeDialog:() => void, refreshData?: () => void}) {
    const [ isLoading, setIsLoading ] = useState(false)
    const { toast } = useToast();
    // Handle Submit
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true)
            const response = await fetch(`/api/crud/categories/${category ? category.idCategoria : '' }`, {
                method: category ? 'PATCH' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Error al ${category ? 'actualizar' : 'crear'} la categoria: ${response.statusText}`);
            }
            toast({
                title: "Éxito",
                description: `Categoría ${category ? 'actualizada' : 'creada' } correctamente`,
                variant: "success"
            });
            if (refreshData) { refreshData(); };
            closeDialog();
        } catch (error) {
            console.error("Error en onSubmit:", error);
            // Aquí capturamos el mensaje del error para mostrarlo
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
        defaultValues: {
            nombreCategoria: category?.nombreCategoria || '' ,
            descripcionCategoria: category?.descripcionCategoria || '' ,
            iconoCategoria: category?.iconoCategoria || '' ,
            bgCategoria: category?.bgCategoria || '' ,
            idNivel: category?.idNivel || undefined,
        },
    })

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

    return (
        <div onFocus={handleFocus}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {category ? (
                        <FormItem>
                            <FormLabel>ID</FormLabel>
                                <FormControl>
                                    <Input disabled={true} value={category?.idCategoria}/>
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
                        name="nombreCategoria"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder="e.j Animales" {...field} onKeyDown={(e) => e.stopPropagation()}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="descripcionCategoria"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descripción</FormLabel>
                                <FormControl>
                                    <Input placeholder="Breve descripción sobre el tema" {...field} onKeyDown={(e) => e.stopPropagation()}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="iconoCategoria"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Icono <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre o enlace" {...field} onKeyDown={(e) => e.stopPropagation()}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bgCategoria"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fondo</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.j https://imagen-ejemplo.com" {...field} onKeyDown={(e) => e.stopPropagation()}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="idNivel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ID Nivel <span className="text-red-500">*</span></FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value ? field.value.toString() : undefined}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione un Nivel" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='1'>1 - Básico</SelectItem>
                                        <SelectItem value='2'>2 - Intermedio</SelectItem>
                                        <SelectItem value='3'>3 - Avanzado</SelectItem>
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
                            <Button type="submit" variant="default" className="text-background" disabled={isLoading}>{!category ? 'Crear Registro' : 'Actualizar Registro'}</Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    )
};