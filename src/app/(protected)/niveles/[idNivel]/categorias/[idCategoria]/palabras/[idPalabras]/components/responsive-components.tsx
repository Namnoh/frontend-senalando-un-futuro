"use client";

import { TitleProp } from "@/interfaces/commonInterfaces";
import { Palabra } from "@/interfaces/palabraInterface";
import React, { useEffect, useState, useRef } from "react";
import MobileCarousel from "./carrusel/mobile-carousel";
import DesktopCarousel from "./carrusel/desktop-carousel";
import { useMediaQuery } from "@mui/material";
import DesktopCamera from "./camera/desktop-camera";
import MobileCamera from "./camera/mobile-camera";
import DesktopVideo from "./vide/desktop-video";
import MobileVideo from "./vide/mobile-video";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { useProgressContext } from "@/contexts/userProgressContext";
import {
  CategoriaProgreso,
  PalabraProgreso,
  UserProgress,
} from "@/interfaces/levelinterface";
import Confetti from "react-confetti";
import { Player } from "@lottiefiles/react-lottie-player";

interface ResponsiveComponentsProps {
  level: TitleProp;
  category: TitleProp;
  word: Palabra;
  words: Palabra[];
  currentWordIndex: number;
}

export default function ResponsiveComponents({
  level,
  category,
  word,
  words,
  currentWordIndex: initialIndex,
}: ResponsiveComponentsProps) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [successTry, setSuccessTry] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const { progress, updateUserProgress } = useProgressContext();

  const [showAchievement, setShowAchievement] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!progress) return;
    const wordFound = Object.values(progress.palabrasProgreso).find(
      (palabra) => palabra.idPalabra === word.idPalabra
    );
    if (wordFound) setSuccessTry(3);
  }, [progress, word.idPalabra]);

  async function updateWordProgress() {
    if (!session?.user?.id) {
      console.error(
        "No se ha iniciado sesión o no se puede obtener el ID de usuario"
      );
      return;
    }

    if (!progress) {
      console.error("No hay datos de progreso disponibles");
      return;
    }

    setIsLoading(true);

    try {
      const categoryWordsResponse = await fetch(
        `/api/words/getWordsFromCategory/${category.idTitle}`,
        {
          method: "GET",
          cache: "no-cache",
        }
      );
      if (!categoryWordsResponse.ok) {
        throw new Error("Failed to fetch words");
      }
      const categoryWordsTotal = await categoryWordsResponse.json();

      const palabraProgreso: PalabraProgreso = {
        idPalabra: Number(word.idPalabra),
        nombrePalabra: word.nombrePalabra,
        categoriaPalabra: category.idTitle,
        nivelPalabra: level.idTitle,
      };
      const palabrasProgreso: Record<string, PalabraProgreso> = {
        ...progress.palabrasProgreso,
        [word.idPalabra]: palabraProgreso,
      };

      const wordsCount = Object.values(palabrasProgreso).filter(
        (palabra) => palabra.categoriaPalabra === category.idTitle
      ).length;
      const porcentajeCategoria = wordsCount / categoryWordsTotal.length;
      const categoriaProgreso: CategoriaProgreso = {
        idCategoria: category.idTitle,
        nombreCategoria: category.nameTitle,
        progresoCategoria: porcentajeCategoria,
        nivelCategoria: level.idTitle,
      };
      const categoriasProgreso: Record<string, CategoriaProgreso> = {
        ...progress.categoriasProgreso,
        [category.idTitle]: categoriaProgreso,
      };

      const levelWordsResponse = await fetch(
        `/api/words/getAllWordsFromLevel/${level.idTitle}`,
        {
          method: "GET",
          cache: "no-cache",
        }
      );
      if (!levelWordsResponse.ok) {
        throw new Error("Failed to fetch words");
      }
      const levelWords = await levelWordsResponse.json();

      const progressWordsCount = Object.values(palabrasProgreso).filter(
        (palabra) => palabra.nivelPalabra === level.idTitle
      ).length;
      const porcentajeTotal = Math.round(
        100 * (progressWordsCount / levelWords.length)
      );

      let updatedProgress: UserProgress;
      if (porcentajeTotal === 100 && progress.idNivel != 3) {
        updatedProgress = {
          idProgreso: Number(progress.idProgreso),
          categoriasProgreso: categoriasProgreso,
          palabrasProgreso: palabrasProgreso,
          porcentajeNivel: 0,
          idUsuario: Number(progress.idUsuario),
          idNivel: Number(progress.idNivel) + 1,
        };
      } else {
        updatedProgress = {
          idProgreso: Number(progress.idProgreso),
          categoriasProgreso: categoriasProgreso,
          palabrasProgreso: palabrasProgreso,
          porcentajeNivel: porcentajeTotal,
          idUsuario: Number(progress.idUsuario),
          idNivel: Number(progress.idNivel),
        };
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await updateUserProgress(updatedProgress);
    } catch (error) {
      console.error("Error al actualizar el progreso:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isLoading) {
      toast({
        title: "Guardando Progreso",
        description: "Por favor, no salga de la página.",
        variant: "warning",
      });
    }
  }, [isLoading]);

  const isSuccessTry = () => {
    setSuccessTry((prev) => {
      const newValue = prev + 1;
      if (prev !== 3 && newValue === 3) {
        updateWordProgress();
        setShowAchievement(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setShowAchievement(false), 7000);
      }
      return newValue >= 3 ? 3 : newValue;
    });
  };

  const isMobile = useMediaQuery("(max-width: 1024px)");
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const construirUrlPalabra = (palabra: Palabra) => {
    return `/niveles/${encodeURIComponent(level.idTitle)}-${encodeURIComponent(
      level.nameTitle
    )}/categorias/${encodeURIComponent(category.idTitle)}-${encodeURIComponent(
      category.nameTitle
    )}/palabras/${encodeURIComponent(palabra.idPalabra)}-${encodeURIComponent(
      palabra.nombrePalabra
    )}`;
  };

  const manejarNavegacion = (direccion: "siguiente" | "anterior") => {
    if (!mounted || words.length === 0) return;

    let nuevoIndice = currentIndex;

    if (direccion === "siguiente") {
      nuevoIndice = (currentIndex + 1) % words.length;
    } else {
      nuevoIndice = (currentIndex - 1 + words.length) % words.length;
    }

    setCurrentIndex(nuevoIndice);
    const nuevaPalabra = words[nuevoIndice];
    router.push(construirUrlPalabra(nuevaPalabra));
  };

  const manejadoresDeslizamiento = useSwipeable({
    onSwipedLeft: () => manejarNavegacion("siguiente"),
    onSwipedRight: () => manejarNavegacion("anterior"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  if (!mounted) {
    return null;
  }

  return (
    <>
      {showAchievement && (
        <>
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={100}
            recycle={false}
          />
          <div
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center
                        transition-opacity duration-500
                        ${showAchievement
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
              }`}
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-green-500 mb-4 animate-bounce">
                ¡Felicidades!
              </h2>
              <p className="text-xl mb-4 text-white">
                Has completado la palabra
              </p>
              <Player
                autoplay
                loop={false}
                src="/complete.json"
                style={{ width: 200, height: 200, margin: "0 auto" }}
              />
            </div>
          </div>
        </>
      )}
      {isMobile ? (
        <div className="flex flex-col w-[320px] sm:w-[600px]">
          <h2
            className={`text-center text-3xl font-medium ${
              successTry < 3 ? "text-red-500" : "text-green-500"
            }`}
          >
            {successTry}/3
          </h2>
          <div {...manejadoresDeslizamiento}>
            <MobileCamera word={word} isSuccessTry={isSuccessTry} />
          </div>
          <MobileVideo word={word} />
          <div {...manejadoresDeslizamiento}>
            <MobileCarousel
              level={level}
              category={category}
              words={words}
              currentWordIndex={currentIndex}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full w-full items-center justify-center gap-10">
          <h2
            className={`text-3xl font-medium ${
              successTry < 3 ? "text-red-500" : "text-green-500"
            }`}
          >
            {successTry}/3
          </h2>
          <div className="flex flex-grow gap-2 items-center w-full justify-center">
            <DesktopVideo word={word} />
            <DesktopCamera word={word} isSuccessTry={isSuccessTry} />
          </div>
          <DesktopCarousel level={level} category={category} words={words} />
        </div>
      )}
    </>
  );
}
