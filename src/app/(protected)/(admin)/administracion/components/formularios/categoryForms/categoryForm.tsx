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

export function CategoryForm({category}:{category?:Categoria}) {
    // Se define el formulario
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombreCategoria: category ? category.nombreCategoria : '' ,
            descripcionCategoria: category ? category.descripcionCategoria : '' ,
            iconoCategoria: category ? category.iconoCategoria : '' ,
            bgCategoria: category ? category.bgCategoria : '' ,
            status: category ? category.status : 0 ,
            idNivel: category ? category.idNivel : undefined,
        },
    })


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {category ? (
                    <FormItem>
                        <FormLabel>ID</FormLabel>
                            <FormControl>
                                <Input placeholder="Jhon" disabled={true} value={category?.idCategoria}/>
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
                            <FormLabel>Nombre*</FormLabel>
                            <FormControl>
                                <Input placeholder="Animales" {...field} />
                            </FormControl>
                            {/* <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
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
                                <Input placeholder="Breve descripción sobre el tema" {...field} />
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
                            <FormLabel>Icono</FormLabel>
                            <FormControl>
                                <Input placeholder="Nombre o enlace" {...field} />
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
                                <Input placeholder="hhttps://imagenejemplo.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estado</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="Entre 0 y 1"
                                    {...field}
                                />
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
                            <FormLabel>ID Nivel</FormLabel>
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
                    <Button type="submit" variant="default" className="text-background">{!category ? 'Crear Registro' : 'Actualizar Registro'}</Button>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancelar</Button>
                    </DialogClose>
                </div>
            </form>
        </Form>
    )
}

// Handle Submit
function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: crear lógica de creación de usuario
    console.log(values)
}