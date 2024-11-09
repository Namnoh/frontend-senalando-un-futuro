import { NextResponse } from 'next/server';
import { fetchUserProgress } from '@/services/level.service';
import { UserProgress } from '@/interfaces/levelinterface';

export async function GET(request: Request, context:any): Promise<NextResponse<UserProgress>> {
    const { params } = context;
    const userProgress = await fetchUserProgress(Number(params.idUsuario));
    return NextResponse.json(userProgress);
};