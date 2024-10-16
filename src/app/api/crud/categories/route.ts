import { NextResponse } from 'next/server';
import { getAllCategories } from '@/services/categories.service';
import { Categoria } from '@/interfaces/categoriaInterface';

export async function GET(): Promise<NextResponse<Categoria[]>> {
    const categories = await getAllCategories();
    return NextResponse.json(categories);
};