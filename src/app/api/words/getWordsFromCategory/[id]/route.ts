import { NextResponse } from 'next/server';
import { getWordsFrom } from '@/services/words.service';
import { Palabra } from '@/interfaces/palabraInterface';

export async function GET(request: Request, context:any): Promise<NextResponse<Palabra[]>> {
    const { params } = context;
    const words = await getWordsFrom(Number(params.id));
    return NextResponse.json(words);
};