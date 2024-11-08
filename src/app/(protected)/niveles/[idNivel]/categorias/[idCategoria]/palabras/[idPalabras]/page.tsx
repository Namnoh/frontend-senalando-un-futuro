// src/app/(protected)/niveles/[idNivel]/categorias/[idCategoria]/palabras/[idPalabras]/page.tsx
import DesktopCarousel from './components/carrusel/desktop-carousel'
import { TitleProp } from '@/interfaces/commonInterfaces'

export default function WordsPage({ params }: { params: { idNivel: string, idCategoria: string } }) {
  const level: TitleProp = { idTitle: parseInt(params.idNivel, 10), nameTitle: "Level " + params.idNivel }
  const category: TitleProp = { idTitle: parseInt(params.idCategoria, 10), nameTitle: "Category " + params.idCategoria }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Words for Level {params.idNivel}, Category {params.idCategoria}</h1>
      <DesktopCarousel level={level} category={category} />
    </div>
  )
}