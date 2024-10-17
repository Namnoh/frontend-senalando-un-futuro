import 'server-only';

import { TitleProp } from '@/interfaces/commonInterfaces';
import { getLevelTitle } from './level.service';
import { getCategoryTitle } from './categories.service';

export async function getParamsTitle(params:string, type:string): Promise<TitleProp> {
    const [idTitleString, nameTitleCodificado] = params ? params.split('-') : [];
    const idTitle = Number(idTitleString);
    let nameTitle: string = '';
    if (!nameTitleCodificado) {
        type.toLowerCase() === 'level' ? nameTitle = await getLevelTitle(idTitle) : nameTitle = await getCategoryTitle(idTitle);
    } else {
        nameTitle = decodeURIComponent(nameTitleCodificado);
    }
    
    const level:TitleProp = { idTitle, nameTitle }
    return level;
};