'use client'
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function BackButton({actualRoute, isMobile}: {actualRoute:string, isMobile:(boolean | undefined)}) {
    const router = useRouter();
    const isWordsSection = actualRoute.endsWith('/palabras');

    return (
        <Button
            variant={`${isWordsSection ? 'fullGhost' : 'default'}`}
            onClick={() => router.back()}
            className={`fixed z-50 ${isMobile ? 'top-5 right-5' : 'top-7 right-7'} ${isWordsSection ? 'text-white' : ''}`}
        >
            <ArrowLeft className="h-5 w-5" />
        </Button>
    )
}
