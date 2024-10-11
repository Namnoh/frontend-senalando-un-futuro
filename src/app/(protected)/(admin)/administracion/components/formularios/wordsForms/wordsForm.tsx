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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function WordForm({word}:{word?:Palabra}) {
    // Se define el formulario
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombrePalabra: word ? word.nombrePalabra : '' ,
            iconoPalabra: word ? word.iconoPalabra : '' ,
            videoPalabra: word ? word.videoPalabra : '' ,
            status: word ? word.status : false ,
            idCategoria: word ? word.idCategoria : undefined,
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
                            <FormLabel>Nombre*</FormLabel>
                            <FormControl>
                                <Input placeholder="Gato" {...field} />
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
                    name="iconoPalabra"
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
                    name="videoPalabra"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fondo</FormLabel>
                            <FormControl>
                                <Input placeholder="Enlace de video" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Notify me about...</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value.toString()}
                                    className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="true" />
                                            </FormControl>
                                            <FormLabel className="font-normal">Completada</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="false" />
                                            </FormControl>
                                            <FormLabel className="font-normal">No Completada</FormLabel>
                                        </FormItem>
                                </RadioGroup>
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
                            <FormLabel>ID Nivel</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione un Nivel" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value='1'>1 - Abecedario</SelectItem>
                                    <SelectItem value='2'>2 - Animales</SelectItem>
                                    <SelectItem value='3'>3 - Saludos</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-row sm:justify-between w-full">
                    <Button type="submit" variant="default" className="text-background">{!word ? 'Crear Registro' : 'Actualizar Registro'}</Button>
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