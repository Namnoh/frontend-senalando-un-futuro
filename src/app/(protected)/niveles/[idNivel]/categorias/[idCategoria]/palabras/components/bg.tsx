import { Categoria } from '@/interfaces/categoriaInterface'
import { getCategory } from '@/services/categories.service';

export default async function Bg({idCategoria}: {idCategoria: number}) {
    const category: Categoria = (await getCategory(idCategoria))!;
    return (
        <>
            {/* Imagen de fondo */}
            <div 
                className='absolute inset-0 bg-cover bg-center w-full h-full -z-10' 
                style={{ backgroundImage: `url(${category?.bgCategoria})` }}
            >
                {/* Superposición oscura y blur */}
                <div className="absolute inset-0 bg-black bg-opacity-65 backdrop-blur-sm -z-10"></div>
            </div>
        </>
    )
}
