import { getCategoriesFrom } from '@/services/categories.service';
import { TitleProp } from '@/interfaces/commonInterfaces';
import { MiniCardGalery } from '@/components/customUI/miniCardGalery';
import { Categoria } from '@/interfaces/categoriaInterface';
// import { useCallback, useEffect, useMemo, useState } from 'react';
// import { Categoria } from '@/interfaces/categoriaInterface';
// import { MiniCardGalerySkeleton } from '@/components/customUI/skeletons/miniCardGalerySkeleton';

// const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos en milisegundos
// const CACHE_KEY = 'users_cache'

// interface CacheData {
//     data: Categoria[]
//     expiry: number
// }

export default async function CategoriesContainer({level}: {level:TitleProp}) {
    const categories = await getCategoriesFrom(level.idTitle);
    // ? ver cómo mejorar el rendimineto de las peticiones y si se puede mejorar con SSR
    // TODO: SI APLICO ESTO, DEBE GUARDAR TAMBIÉN EL ID DE LA CATEGORÍA Y RECARGARLA CUANDO SEA DIFERENTE Y NECESARIO
    // const [data, setData] = useState<Categoria[]>([])
    // const [isLoading, setIsLoading] = useState(true)
    // const [error, setError] = useState<Error | null>(null)

    // const fetchUsers = useCallback(async (force = false) => {
    //     const now = Date.now()
    //     const cachedData = localStorage.getItem(CACHE_KEY)

    //     if (!force && cachedData) {
    //         const { data: cachedUsers, expiry }: CacheData = JSON.parse(cachedData)
    //         if (now < expiry) {
    //             setData(cachedUsers)
    //             setIsLoading(false)
    //             return
    //         }
    //     }

    //     setIsLoading(true)
    //     try {
    //         const fetchedData = await getCategoriesFrom(level.idTitle)
    //         setData(fetchedData)
    //         localStorage.setItem(CACHE_KEY, JSON.stringify({
    //             data: fetchedData,
    //             expiry: now + CACHE_DURATION
    //         }))
    //         setIsLoading(false)
    //     } catch (err) {
    //         setError(err instanceof Error ? err : new Error('An error occurred while fetching users'))
    //         setIsLoading(false)
    //     }
    // }, [])

    // useEffect(() => {
    //     fetchUsers()
    // }, [fetchUsers])

    // const categories = useMemo(() => data, [data])

    // if (isLoading && data.length==0){
    //     return <MiniCardGalerySkeleton length={4} />
    // }

    return (
        <div className='flex flex-wrap justify-center gap-5 w-2/3 mb-10'>
            { categories.map((c:Categoria) =>
                {
                    return (
                        <MiniCardGalery
                            key={c.idCategoria}
                            level={level}
                            item={c}
                            iconClasses='h-16 w-16 lg:h-20 lg:w-20'
                        />
                    )
                }
            )}
        </div>
    )
}
