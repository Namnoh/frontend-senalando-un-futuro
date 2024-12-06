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
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { Categoria } from "@/interfaces/categoriaInterface";

export function WordForm({word, closeDialog, refreshData}:{word?:Palabra, closeDialog:() => void, refreshData?: () => void}) {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ categories, setCategories ] = useState<Categoria[]>([]);
    const [ requiredLevel, setRequiredLevel ] = useState<number | null>(null);
    const [ requiredCategory, setRequiredCategory ] = useState<Categoria[]>([]);
    const { toast } = useToast();

    // Se define el formulario
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombrePalabra: word?.nombrePalabra || '' ,
            iconPalabra: word?.iconPalabra || '' ,
            videoPalabra: word?.videoPalabra || '' ,
            idCategoria: word?.idCategoria || undefined,
            idNivel: word?.idNivel || undefined,
        },
    });

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
        };
    };

    const getCategories = async () => {
        try {
            const response = await fetch('/api/crud/categories');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            };
            const fetchedData = await response.json();
            setCategories(fetchedData);
            setRequiredCategory(fetchedData)
        } catch (err) {
            console.error('Hubo un error con la obtención de las categorías.')
        };
    };
    
    useEffect( () => {
        if (word) { setRequiredLevel(word.idNivel); }
        getCategories();
    }, []);

    const handleCategoryOnChange = (value:string) => {
        const selectedCategory = categories.find((c:Categoria) => c.idCategoria === Number(value));
        if (selectedCategory) {
            form.setValue('idNivel', selectedCategory.idNivel);
            setRequiredLevel(selectedCategory.idNivel);
        }
    };

    const handleLevelOnChange = (value:string) => {
        const filterCategories = categories.filter((c:Categoria) => c.idNivel === Number(value));
        if (filterCategories) {
            setRequiredCategory(filterCategories);
        };
    };

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
        if (word){
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
                    {word ? (
                        <FormItem>
                            <FormLabel>ID</FormLabel>
                                <FormControl>
                                    <Input disabled={true} value={word?.idPalabra}/>
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
                                    <Input placeholder="e.j Gato" {...field} onKeyDown={(e) => e.stopPropagation()}/>
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
                                    <Input placeholder="Nombre o enlace" {...field} onKeyDown={(e) => e.stopPropagation()}/>
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
                                    <Input placeholder="e.j https://video.com" {...field} onKeyDown={(e) => e.stopPropagation()}/>
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
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        handleCategoryOnChange(value);
                                    }}
                                    value={field.value?.toString()}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione una Categoría" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {requiredCategory.length === 0 ? (
                                            <div>No hay categorías</div>
                                        ) : (requiredCategory.map(category => {
                                                return (
                                                    <SelectItem
                                                        key={category.idCategoria}
                                                        value={category.idCategoria.toString()}
                                                    >
                                                        {category.idCategoria} - {category.nombreCategoria}
                                                    </SelectItem>
                                                )
                                            })
                                        )}
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
                                <Select onValueChange={(value) => {
                                        field.onChange(value);
                                        handleLevelOnChange(value);
                                    }}
                                    defaultValue={field.value?.toString()}
                                    value={requiredLevel ? requiredLevel.toString() : undefined}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione un Nivel" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='1' disabled={requiredLevel ? (requiredLevel === 1 ? false : true) : false}>1 - Básico</SelectItem>
                                        <SelectItem value='2' disabled={requiredLevel ? (requiredLevel === 2 ? false : true) : false}>2 - Intermedio</SelectItem>
                                        <SelectItem value='3' disabled={requiredLevel ? (requiredLevel === 3 ? false : true) : false}>3 - Avanzado</SelectItem>
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
                            <Button type="submit" variant="default" className="text-background">{!word ? 'Crear Registro' : 'Actualizar Registro'}</Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    )
}