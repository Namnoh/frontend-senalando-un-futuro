import { UserProgress } from "@/interfaces/levelinterface";
import { updateProgress } from "@/services/level.service";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, context:any): Promise<NextResponse> {
    try {
        const { params } = context;
        const userProgress: UserProgress = await request.json(); // Obtener el cuerpo de la solicitud
        const response = await updateProgress(userProgress, Number(params.id));
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 500 });
        };
        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        console.error("Error en POST:", error);
        return NextResponse.json({ error: 'No se pudo actualizar el progreso.' }, { status: 500 }); // Manejo de errores
    }
};