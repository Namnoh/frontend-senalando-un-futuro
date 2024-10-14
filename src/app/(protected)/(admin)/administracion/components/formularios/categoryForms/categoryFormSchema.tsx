import { z } from "zod"

export const formSchema = z.object({
    nombreCategoria: z.string({required_error: "Debe ingresar un nombre.",}).min(3, {
        message: "Debe ingresar un nombre válido, mínimo 3 carácteres.",
    }),
    descripcionCategoria: z.string(),
    iconoCategoria: z.string({required_error: "Debe ingresar un icono.",}),
    bgCategoria: z.string(),
    status: z.union([
        z.string({required_error: "Debe ingresar un estado."})
            .refine((val) => !isNaN(parseFloat(val)) && isFinite(Number(val)), {
                message: "Debe ser un número decimal válido."
            }),
            z.number({required_error: "Debe ingresar un estado."})
        ])
        .refine((val) => {
            const num = typeof val === 'string' ? parseFloat(val) : val;
            return num >= 0 && num <= 1;
        }, {
            message: "El estado debe ser un número decimal entre 0 y 1."
        })
        .transform((val) => {
            const num = typeof val === 'string' ? parseFloat(val) : val;
            return Number(num.toFixed(2)); // Redondea a 2 decimales
        }),
    idNivel: z.union([z.string({required_error: "Debe ingresar un nivel.",}), z.number({required_error: "Debe ingresar un nivel.",}).int()])
        .refine((val) => !isNaN(Number(val)), {
            message: "Debe ser un número válido"
        })
        .transform((val) => Number(val)),
});