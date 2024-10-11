import { TitleProp } from "@/interfaces/commonInterfaces";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export function getParamsTitle(params:string): TitleProp {
  const [idTitleString, nameTitleCodificado] = params ? params.split('-') : [];
  const idTitle = Number(idTitleString);
  const nameTitle = decodeURIComponent(nameTitleCodificado).toUpperCase();
  
  const level:TitleProp = { idTitle, nameTitle }
  return level;
};

export function capitalizeFirstLetter(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}