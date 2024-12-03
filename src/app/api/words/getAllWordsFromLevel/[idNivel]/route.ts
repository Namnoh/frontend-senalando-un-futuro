import { NextResponse } from 'next/server';
import { getAllWordsFromLevel } from '@/services/words.service';
import { Palabra } from '@/interfaces/palabraInterface';

export async function GET(request: Request, context:any): Promise<NextResponse<Palabra[]>> {
    const { params } = context;
    const words = await getAllWordsFromLevel(Number(params.idNivel));
    return NextResponse.json(words);
};