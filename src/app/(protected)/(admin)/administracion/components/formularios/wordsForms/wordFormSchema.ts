import { z } from "zod"

export const formSchema = z.object({
    nombrePalabra: z.string({required_error: "Debe ingresar un nombre.",}).min(3, {
        message: "Debe ingresar un nombre válido, mínimo 3 carácteres.",
    }),
    iconoPalabra: z.string({required_error: "Debe ingresar un icono.",}),
    videoPalabra: z.string(),
    status: z.boolean({required_error: "Debe tener un estado"}),
    idCategoria: z.union([z.string({required_error: "Debe ingresar una categoría.",}), z.number({required_error: "Debe ingresar una categoría.",}).int()])
        .refine((val) => !isNaN(Number(val)), {
            message: "Debe ser un número válido"
        })
        .transform((val) => Number(val)),
});