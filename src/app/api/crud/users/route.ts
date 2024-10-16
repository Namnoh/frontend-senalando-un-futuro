import { NextResponse } from 'next/server';
import { getAllUsers } from '@/services/users.service';
import { Usuario } from '@/interfaces/usuarioInterface';

export async function GET(): Promise<NextResponse<Usuario[]>> {
    const users = await getAllUsers();
    return NextResponse.json(users);
};