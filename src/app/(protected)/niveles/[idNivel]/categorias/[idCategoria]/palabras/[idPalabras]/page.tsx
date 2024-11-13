
import { Suspense } from 'react'
import DesktopCarousel from './components/carrusel/desktop-carousel'
import { getParamsTitle } from '@/services/actions.services'
import { getWordsFrom } from '@/services/words.service'
import ResponsiveComponents from './components/responsive-components'

export default async function WordsPage({params}:any) {
  const level = await getParamsTitle(params.idNivel, 'level');
  const cat = await getParamsTitle(params.idCategoria, 'category');
  const words = await getWordsFrom(cat.idTitle)
  const palabra = await getParamsTitle(params.idPalabras, 'words');

  return (
    <div className="relative flex h-full w-full">
      <div className='flex flex-col items-center gap-20 flex-grow'>
        {/* Palabras */}
        <div>
          <h2 className='text-5xl md:text-6xl lg:text-7xl font-medium text-white capitalize'>{palabra.nameTitle}</h2>
        </div>
        <Suspense>
          <ResponsiveComponents level={level} category={cat} words={words}/>
        </Suspense>
      </div>
    </div>
  )
}