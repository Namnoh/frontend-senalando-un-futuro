import React from "react";
import styles from './styles/home.module.scss';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import  Link  from "next/link";
import Image from "next/image";
import ScrollPrompt from "@/components/customUI/scroll-prompt"
import AnimatedSection from "@/components/customUI/animated-section"

const HomePage = () => {
  return (
    // inicio contenedor principal
    <>
      <div className={styles.backgroundImage}>  
        <div className='flex flex-col lg:flex-row items-center justify-center gap-5 sm:gap-6 md:justify-evenly lg:flex-wrap h-[100vh] p-4 -mt-[60px]  lg:mt-0'>
          <div className="lg:max-w-[60%] sm:max-w-[70%] md:max-w-[70%] max-w-[70%] flex flex-col items-center">
            <div className="text-center font-medium mb-5 xl:text-[40px] lg:text-[34px] md:text-[28px] sm:bg-transparent sm:text-[28px] text-[26px] bg-background">
              ¡Empieza Ahora a Aprender Lengua de Señas Chilena con Ayuda de la Inteligencia Artificial!
            </div>
            <div className="flex flex-col items-center">
              <Separator className="bg-[#2EC4B6] mb-6 lg:w-[300%] w-[140%]" />
              <Button className="rounded-lg text-[18px] h-12 w-44" variant="default">
                <Link href="/login" className="text-center">Empieza Ahora!</Link>
              </Button>
            </div>
          </div>
          <div className="ml-[10px] lg:max-w-[50%] flex flex-col text-center justify-center items-center">
            <section>
              <Image
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
      
      {/* Inicio secciones */}

      {/* Seccion 1 */}
      <AnimatedSection className='flex flex-col lg:flex-row-reverse items-center justify-center gap-5 sm:gap-6 md:justify-evenly lg:flex-wrap h-[80vh] mt-10'>
        <div className="lg:max-w-[60%] sm:max-w-[80%] md:max-w-[80%] max-w-[90%] flex flex-col items-center">
          <div className="text-center mb-5 lg:text-5xl md:text-[28px] sm:text-[28px] text-3xl">
            ¿Que es S.U.F?
          </div>
          <div className="text-center text-lg md:text-xl lg:text-2xl">
            Señalando un Futuro (S.U.F) es una innovadora aplicación diseñada para enseñar lengua de señas chilenas a personas de todas las edades. Con un enfoque interactivo y educativo, buscamos facilitar la comunicación y la inclusión social.
          </div>
        </div>
        <div className="ml-[10px] lg:max-w-[50%] flex flex-col text-center justify-center items-center">
          <section>
            <Image
              className="w-[30vh] mr-1"
              src="/images/Logo_SinBG.png"
              alt="Logo"
              width={240}
              height={240}
              priority
            />
          </section>
        </div>
        <Separator className="m-6 w-4/5 bg-secondary" />
      </AnimatedSection>
      {/* Seccion 2 */}
      <AnimatedSection className='flex flex-col lg:flex-row items-center justify-center gap-5 sm:gap-6 md:justify-evenly lg:flex-wrap h-[80vh] mt-10'>
        <div className="lg:max-w-[60%] sm:max-w-[70%] md:max-w-[70%] max-w-[70%] flex flex-col items-center">
          <div className="text-center mb-5 lg:text-5xl md:text-[28px] sm:text-[28px] text-3xl">
            ¿Cómo es que funciona?
          </div>
          <div className="text-center text-lg md:text-xl lg:text-2xl">
            La aplicación ofrece tres niveles de aprendizaje, con diferentes categorías, donde podrás ver cómo realizar la seña y luego recibirás retroalimentación personalizada y a tiempo real gracias a nuestra Super duper inteligencia artificial</div>
        </div>
        <div className="ml-[10px] lg:max-w-[50%] flex flex-col text-center justify-center items-center">
          <section>
            <Image
              className="w-[30vh] mr-1"
              src="/images/Logo_SinBG.png"
              alt="Logo"
              width={240}
              height={240}
              priority
            />
          </section>
        </div>
        <Separator className="m-6 w-[70%] bg-secondary" />
      </AnimatedSection>

      {/* Seccion 3 */}
      <AnimatedSection className='flex flex-col lg:flex-row-reverse items-center justify-center gap-5 sm:gap-6 md:justify-evenly lg:flex-wrap h-[80vh] mt-10'>
        <div className="lg:max-w-[60%] sm:max-w-[70%] md:max-w-[70%] max-w-[70%] flex flex-col items-center">
          <div className="text-center mb-5 lg:text-5xl md:text-[28px] sm:text-[28px] text-3xl">
            ¿Que beneficios tendras al usar S.U.F?
          </div>
          <div className="text-center text-lg md:text-xl lg:text-2xl">
            Con Señalando un Futuro, los usuarios pueden mejorar sus habilidades de comunicación, conectarse con la comunidad sorda y abrir nuevas oportunidades en su vida personal y profesionalLa aplicación ofrece tres niveles de aprendizaje, retroalimentación personalizada y a tiempo real gracias a nuestra Super duper inteligencia artificial
          </div>
        </div>
        <div className="ml-[10px] lg:max-w-[50%] flex flex-col text-center justify-center items-center">
          <section>
            <Image
              className="w-[30vh] mr-1"
              src="/images/Logo_SinBG.png"
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
          ¡ Que esperas Unete !
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

