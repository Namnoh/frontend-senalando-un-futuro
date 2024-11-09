import { getWordsFrom } from '@/services/words.service';
import { MiniCardGalery } from '@/components/customUI/miniCardGalery';
import { TitleProp } from '@/interfaces/commonInterfaces';
import { Palabra } from '@/interfaces/palabraInterface';

export default async function WordsContainer({level, category}: {level:TitleProp, category:TitleProp}) {
    const words = await getWordsFrom(category.idTitle);

    return (
        <div className='flex flex-wrap justify-center gap-5 w-2/3 mb-10'>
            { words.map((w:Palabra) =>
                {
                    return (
                        <MiniCardGalery
                            key={w.idPalabra}
                            level={level}
                            category={category}
                            item={w}
                            iconClasses='h-16 w-16 lg:h-20 lg:w-20 text-black'
                        />
                    )
                }
            )}
        </div>
    )
}
