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
import { formSchema } from "./wordFormSchema";
import { Palabra } from "@/interfaces/palabraInterface";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogClose } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";

export function WordForm({word, closeDialog, refreshData}:{word?:Palabra, closeDialog:() => void, refreshData: () => void}) {
    const [ isLoading, setIsLoading ] = useState(false)
    const { toast } = useToast();
    // Handle Submit
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true)
            const response = await fetch(`/api/crud/words/${word ? word.idPalabra : '' }`, {
                method: word ? 'PATCH' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Error al ${word ? 'actualizar' : 'crear'} la palabra: ${response.statusText}`);
            }
            toast({
                title: "Éxito",
                description: `Palabra ${word ? 'actualizada' : 'creada' } correctamente`,
                variant: "success"
            });
            refreshData();
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
        defaultValues: {
            nombrePalabra: word ? word.nombrePalabra : '' ,
            iconPalabra: word ? word.iconPalabra : '' ,
            videoPalabra: word ? word.videoPalabra : '' ,
            idCategoria: word ? word.idCategoria : undefined,
            idNivel: word ? word.idNivel : undefined,
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {word ? (
                    <FormItem>
                        <FormLabel>ID</FormLabel>
                            <FormControl>
                                <Input placeholder="Jhon" disabled={true} value={word?.idCategoria}/>
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
                    name="nombrePalabra"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input placeholder="Gato" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="iconPalabra"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Icono <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input placeholder="Nombre o enlace" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="videoPalabra"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Video <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input placeholder="Enlace de video" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="idCategoria"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ID Categoria <span className="text-red-500">*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione una Categoría" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value='1'>1 - Animales</SelectItem>
                                    <SelectItem value='2'>2 - Abecedario</SelectItem>
                                    <SelectItem value='3'>3 - Saludos</SelectItem>
                                </SelectContent>
                            </Select>
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
                            <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
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
                    { isLoading ? (
                        <LoaderCircle className={`animate-spin text-primary h-8 w-8`}/>
                    ) : (
                        <Button type="submit" variant="default" className="text-background">{!word ? 'Crear Registro' : 'Actualizar Registro'}</Button>
                    )}
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancelar</Button>
                    </DialogClose>
                </div>
            </form>
        </Form>
    )
}