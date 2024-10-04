"use client";

import React from "react";
import styles from './styles/home.module.scss';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import  Link  from "next/link";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className={styles.backgroundImage}>
      <div className='flex flex-col lg:flex-row items-center justify-center gap-5 md:justify-evenly lg:flex-wrap h-[100vh] p-4'>
        <div className="lg:max-w-[50%] sm:max-w-[70%] md:max-w-[70%] max-w-[70%] flex flex-col items-center">
          <div className="text-center mb-5 lg:text-[44px] md:text-[34px] sm:text-[28px] text-[24px]">
            ¡Empieza Ahora a Aprender Lengua de Señas Chilena con Ayuda de la Inteligencia Artificial!
          </div>
          <div className="flex flex-col items-center">
            <Separator className="bg-[#2EC4B6] mb-6 lg:w-[300%] w-[200%]" />
            <Button className="rounded-lg bg-[#2EC4B6] hover:bg-[#248178] text-[18px] w-[150%] h-[130%]" variant="outline">
              <Link href="/login" className="text-center">Empieza Ahora!</Link>
            </Button>
          </div>
        </div>
        <section className="flex justify-center lg:max-w-[50%]">
          <Image
            className="w-[30vh]"
            src="/images/Logo_SinBG.png"
            alt="Logo"
            width={240}
            height={240}
            priority
          />
        </section>
      </div>
    </div>
  );
};
export default HomePage;

