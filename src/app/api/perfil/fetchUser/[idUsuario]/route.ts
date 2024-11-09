import { NextResponse } from 'next/server';
import { fetchUser } from '@/services/perfil.service';
import { Usuario } from '@/interfaces/usuarioInterface';

export async function GET(request: Request, context:any): Promise<NextResponse<Usuario>> {
    const { params } = context;
    const usuario = await fetchUser(Number(params.idUsuario));
    return NextResponse.json(usuario);
};