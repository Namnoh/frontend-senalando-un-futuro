import { UserProgress } from "@/interfaces/levelinterface";
import { updateUserProgress } from "@/services/level.service";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, context:any): Promise<NextResponse> {
    try {
        const { params } = context;
        const userProgress: Omit<UserProgress, 'idProgreso'> = await request.json(); // Obtener el cuerpo de la solicitud
        const response = await updateUserProgress(Number(params.idUsuario), userProgress);
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 500 });
        };
        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        console.error("Error en POST:", error);
        return NextResponse.json({ error: 'No se pudo actualizar el progreso.' }, { status: 500 }); // Manejo de errores
    }
};