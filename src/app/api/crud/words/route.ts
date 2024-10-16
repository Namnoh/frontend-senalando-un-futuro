import { NextResponse } from 'next/server';
import { getAllWords } from '@/services/words.service';
import { Palabra } from '@/interfaces/palabraInterface';

export async function GET(): Promise<NextResponse<Palabra[]>> {
    const words = await getAllWords();
    return NextResponse.json(words);
};