'use client';

import React, { useEffect, useState } from 'react';
import styles from './styles/home.module.scss';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import NextImage from "next/image"; // Renombrado para evitar conflictos
import ScrollPrompt from "@/components/customUI/scroll-prompt";
import AnimatedSection from "@/components/customUI/animated-section";
import { InfoCapsule } from "@/components/customUI/InfoCapsule";
import Snowfall from 'react-snowfall';

const HomePage = () => {
  const [snowImg, setSnowImg] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = '/images/snowflake.png'; 
    img.onload = () => {
      setSnowImg(img);
    };
  }, []);

  return (
    <>
      {snowImg && (
        <Snowfall
          style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            zIndex: 1
          }}
          snowflakeCount={200}
          speed={[0.5, 3]}
          wind={[-0.5, 2]}
          radius={[5, 20]}
          opacity={[0.1, 0.2]}
          rotationSpeed={[-1, 1]}
          images={[snowImg]}
        />
      )}

      <div className={styles.backgroundImage} style={{ position: 'relative', zIndex: 2 }}>
        <div className='flex flex-col lg:flex-row items-center justify-center gap-5 sm:gap-6 md:justify-evenly lg:flex-wrap h-[100vh] p-4 -mt-[60px] lg:mt-0'>
          <div className="lg:max-w-[60%] sm:max-w-[70%] md:max-w-[70%] max-w-[70%] flex flex-col items-center">
            <div className="text-center font-medium mb-5 xl:text-[40px] lg:text-[34px] md:text-[28px] sm:text-[28px] text-[26px] bg-background">
              ¡Empieza Ahora a Aprender Lengua de Señas Chilena con Ayuda de la Inteligencia Artificial!
            </div>
            <div className="flex flex-col items-center">
              <Separator className="bg-[#2EC4B6] mb-6 lg:w-[300%] w-[140%]" />
              <div className="flex flex-row items-center gap-4">
                <Button className="rounded-lg text-[18px] h-12 w-44" variant="default">
                  <Link href="/login" className="text-center">Empieza Ahora!</Link>                
                </Button>
                <InfoCapsule message={`Ten en cuenta que esta aplicación es solo para motivos específicos,
                  aun así recomendamos tomar cursos reales para poder complementar 
                  lo aprendido`}>
                  </InfoCapsule>
              </div>
            </div>
          </div>
          <div className="ml-[10px] lg:max-w-[50%] flex flex-col text-center justify-center items-center">
            <section>
              <NextImage
                className="w-[30vh] mr-1"
                src="/images/Logo_SinBG.png"
                alt="Logo"
                width={240}
                height={240}
                priority
              />
            </section>
            <div className="flex flex-col pr-4">
              <span className="text-[27px] font-medium text-[#2EC4B6]">Señalando</span>
              <span className="text-[27px] font-medium text-[#FF9F1C]">Un Futuro</span>
            </div>
            <ScrollPrompt />
          </div>
        </div>
      </div>
      
      <AnimatedSection className='flex flex-col lg:flex-row-reverse items-center justify-center gap-5 sm:gap-6 md:justify-evenly lg:flex-wrap h-[80vh] mt-10'>
        <div className="lg:max-w-[60%] sm:max-w-[80%] md:max-w-[80%] max-w-[90%] flex flex-col items-center">
          <div className="text-center mb-5 lg:text-5xl md:text-[28px] sm:text-[28px] text-3xl">
            ¿Que es S.U.F?
          </div>
          <div className="text-center text-lg md:text-xl lg:text-2xl">
            Señalando un Futuro (S.U.F.) es una innovadora aplicación diseñada para enseñar lengua de señas chilenas a personas de todas las edades. Con un enfoque interactivo y educativo, buscamos facilitar la comunicación y la inclusión social.
          </div>
        </div>
        <div className="ml-[10px] lg:max-w-[50%] flex flex-col text-center justify-center items-center">
          <section>
            <NextImage
              className="w-[30vh] mr-1"
              src="/images/logocora.png"
              alt="Logo"
              width={240}
              height={240}
              priority
            />
          </section>
        </div>
        <Separator className="m-6 w-4/5 bg-secondary" />
      </AnimatedSection>

      <AnimatedSection className='flex flex-col lg:flex-row items-center justify-center gap-5 sm:gap-6 md:justify-evenly lg:flex-wrap h-[80vh] mt-10'>
        <div className="lg:max-w-[60%] sm:max-w-[70%] md:max-w-[70%] max-w-[70%] flex flex-col items-center">
          <div className="text-center mb-5 lg:text-5xl md:text-[28px] sm:text-[28px] text-3xl">
            ¿Cómo es que funciona?
          </div>
          <div className="text-center text-lg md:text-xl lg:text-2xl">
            La aplicación ofrece tres niveles de aprendizaje, con diferentes categorías, donde podrás ver cómo realizar la seña y luego recibirás retroalimentación personalizada y a tiempo real gracias a nuestra Super duper inteligencia artificial
          </div>
        </div>
        <div className="ml-[10px] lg:max-w-[50%] flex flex-col text-center justify-center items-center">
          <section>
            <NextImage
              className="w-[30vh] mr-1"
              src="/images/comofunciona.png"
              alt="Logo"
              width={240}
              height={240}
              priority
            />
          </section>
        </div>
        <Separator className="m-6 w-[70%] bg-secondary" />
      </AnimatedSection>

      <AnimatedSection className='flex flex-col lg:flex-row-reverse items-center justify-center gap-5 sm:gap-6 md:justify-evenly lg:flex-wrap h-[80vh] mt-10'>
        <div className="lg:max-w-[60%] sm:max-w-[70%] md:max-w-[70%] max-w-[70%] flex flex-col items-center">
          <div className="text-center mb-5 lg:text-5xl md:text-[28px] sm:text-[28px] text-3xl">
            ¿Que beneficios tendras al usar S.U.F?
          </div>
          <div className="text-center text-lg md:text-xl lg:text-2xl">
            Con Señalando un Futuro (S.U.F.), los usuarios pueden mejorar sus habilidades de comunicación, conectarse con la comunidad sorda y abrir nuevas oportunidades en su vida personal y profesional.
          </div>
        </div>
        <div className="ml-[10px] lg:max-w-[50%] flex flex-col text-center justify-center items-center">
          <section>
            <NextImage
              className="w-[30vh] mr-1"
              src="/images/beneficio.png"
              alt="Logo"
              width={240}
              height={240}
              priority
            />
          </section>
        </div>
        <Separator className="m-6 w-[70%] bg-secondary" />
      </AnimatedSection>      
      <AnimatedSection className="flex flex-col items-center justify-evenly h-[70vh]">
        <div className="text-primary text-center md:mb-5 lg:text-6xl md:text-[28px] sm:text-[28px] text-4xl">
          ¿Qué esperas? ¡ Únete !
        </div>
        <div className="bg-[url('https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2twcXBtdXgzbHJ3eXdrODdrbTg2MXJnMzZ1amJicjNiNWJodmZ1ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tHIRLHtNwxpjIFqPdV/giphy.webp')] bg-center p-32 w-full sm:w-4/5 items-center flex justify-center h-96 md:h-[500px]">
          <Button className="rounded-lg text-[18px]" variant="default">
            <Link href="/login" className="text-center">Empieza Ahora!</Link>
          </Button>
        </div>
      </AnimatedSection>
    </>
  );
};

export default HomePage;
