import { z } from "zod"

export const formSchema = z.object({
    nombreUsuario: z.string({required_error: "Debe ingresar un nombre.",}).min(3, {
        message: "Debe ingresar un nombre válido, mínimo 3 carácteres.",
    }),
    apellidoUsuario: z.string({required_error: "Debe ingresar un apellido.",}).min(3, {
        message: "Debe ingresar un apellido válido, mínimo 3 carácteres.",
    }),
    correoUsuario: z.string({required_error: "Debe ingresar un correo.",}).email({message:"Ingrese un correo válido."}).min(5, {
        message: "Debe ingresar un correo de mínimo 5 carácteres.",
    }),
    idRol: z.union([z.string(), z.number()])
        .refine((val) => !isNaN(Number(val)), {
            message: "Debe ser un número válido"
        })
        .transform((val) => Number(val)),
});