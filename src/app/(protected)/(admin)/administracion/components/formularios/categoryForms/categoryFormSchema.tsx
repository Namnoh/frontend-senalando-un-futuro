import { z } from "zod"

export const formSchema = z.object({
    nombreCategoria: z.string({required_error: "Debe ingresar un nombre.",}).min(3, {
        message: "Debe ingresar un nombre válido, mínimo 3 carácteres.",
    }),
    descripcionCategoria: z.string(),
    iconoCategoria: z.string({required_error: "Debe ingresar un icono.",}),
    bgCategoria: z.string(),
    idNivel: z.union([z.string({required_error: "Debe ingresar un nivel.",}), z.number({required_error: "Debe ingresar un nivel.",}).int()])
        .refine((val) => !isNaN(Number(val)), {
            message: "Debe ser un número válido"
        })
        .transform((val) => Number(val)),
});