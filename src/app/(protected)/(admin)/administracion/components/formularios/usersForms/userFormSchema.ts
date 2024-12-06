import { z } from "zod"

export const formSchema = z.object({
    nombreUsuario: z.string({required_error: "Debe ingresar un nombre.",}).min(1, {
        message: "Debe ingresar un nombre válido, mínimo 1 carácteres.",
    }),
    apellidoUsuario: z.string({required_error: "Debe ingresar un apellido.",}).min(1, {
        message: "Debe ingresar un apellido válido, mínimo 1 carácteres.",
    }),
    correoUsuario: z.string({required_error: "Debe ingresar un correo.",}).email({message:"Ingrese un correo válido."}).min(5, {
        message: "Debe ingresar un correo de mínimo 5 carácteres.",
    }),
    idRol: z.union([z.string({required_error: "Debe ingresar un rol.",}), z.number({required_error: "Debe ingresar un rol.",})])
        .refine((val) => !isNaN(Number(val)), {
            message: "Debe ser un número válido"
        })
        .transform((val) => Number(val)),
});