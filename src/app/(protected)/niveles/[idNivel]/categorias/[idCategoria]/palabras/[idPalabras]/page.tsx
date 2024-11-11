// src/app/(protected)/niveles/[idNivel]/categorias/[idCategoria]/palabras/[idPalabras]/page.tsx

import { Suspense } from 'react';
import DesktopCarousel from './components/carrusel/desktop-carousel';
import { TitleProp } from '@/interfaces/commonInterfaces';
import WordsContainer from '../components/wordsContainer';
import MobileCarousel from './components/carrusel/mobile-carousel';
import CustomHeader from '@/components/customUI/customHeader';
import { getParamsTitle } from '@/services/actions.services';
import { getWordsFrom, getWordById } from '@/services/words.service';
import { Palabra } from '@/interfaces/palabraInterface';

export default async function WordsPage({params}: any) {
  const level = await getParamsTitle(params.idNivel, 'level');
  const cat = await getParamsTitle(params.idCategoria, 'category');

  // Asegurarse de que estos valores sean números
  const palabra = await getWordById(Number(params.idPalabra), Number(params.idCategoria));

  if (!palabra) {
    console.error("No se encontró la palabra.");
    return <div>Error: Palabra no encontrada.</div>;
  }

  return (
    <div className="relative flex h-full w-full">
      <div className='flex flex-col items-center gap-20 flex-grow'>
        <div>
          <h2 className='text-5xl md:text-6xl lg:text-7xl font-medium text-white capitalize'>{palabra.nombrePalabra}</h2>
        </div>
        <Suspense>
          <MobileCarousel level={level} category={cat} words={[]} />
        </Suspense>
      </div>
    </div>
  );
}

