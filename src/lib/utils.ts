import { TitleProp } from "@/interfaces/commonInterfaces";
import { getCategoryTitle } from "@/services/categories.service";
import { getLevelTitle } from "@/services/level.service";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

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

export function capitalizeFirstLetter(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function normalizeString(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}