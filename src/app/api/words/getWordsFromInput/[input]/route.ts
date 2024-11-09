import { NextResponse } from 'next/server';
import { getWordsFromInput } from '@/services/words.service';
import { SearchPalabra } from '@/interfaces/commonInterfaces';

export async function GET(request: Request, context:any): Promise<NextResponse<SearchPalabra[]>> {
    const { params } = context;
    const words = await getWordsFromInput(params.input);
    return NextResponse.json(words);
};