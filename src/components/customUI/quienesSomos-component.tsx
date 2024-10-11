'use client'

import React from 'react'
import Image from 'next/image'
import AnimatedSection from "@/components/customUI/animated-section"

export default function QuienesSomos() {
    const sections = [
        {
            title: "Nuestra misión",
            content: "Nuestra misión como equipo es ayudar a las personas a aprender el lenguaje de señas de manera simple y divertida, usando videos interactivos y retroalimentación personalizada...",
            reverse: true
            //imagen: link de la imagen que no tengo
        },
        {
            title: "Inspiración",
            content: "Todo comienza con un integrante de nuestro grupo el cual estudio un tiempo lenguaje de señas en Chile, de ahi surgio la idea de crear esta aplicacion, cuando decidimos estudiar mas a fondo el lenguaje de señas, nos percatamos de que hay muchas personas que sufren de perdida auditiva y muy pocas personas saben como comunicarse a traves del lenguaje de señas, asi que decidimos poder aportar de algun modo a esas personas que le interesa y esten dispuestas a aprender este hermoso lenguaje",
            reverse: false
        },
        {
            title: "Impacto Social",
            content: "En nuestro equipo, creemos que la comunicación es un derecho universal. Con nuestra plataforma, buscamos derribar barreras entre personas sordas y oyentes, promoviendo una sociedad más inclusiva. A través de un enfoque interactivo, capacitamos a personas de todas las edades para aprender el lenguaje de señas, fomentando la inclusión en escuelas, trabajos y la vida cotidiana. Queremos construir un mundo más equitativo donde todos puedan comunicarse y entenderse.",
            reverse: true
        },
        {
            title: "Plan a futuro",
            content: "Este es solo el comienzo. En el futuro, planeamos expandir nuestra plataforma con nuevas funcionalidades y metas, como:",
            list: [
                "Integrar lenguajes de señas como ASL y LSM para beneficiar a más personas.",
                "Ofrecer cursos especializados en áreas como educación, atención al cliente y turismo.",
                "Desarrollar una aplicación móvil para aprendizaje en cualquier momento y lugar."
            ],
        reverse: false
        }
    ]

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 py-8  sm:py-12 md:py-16 ">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-center text-secondary mt-10 mb-32 sm:mb-24 md:mb-32">
                    Sobre <span className='text-primary'>Nosotros</span>
                </h1>
                {sections.map((section, index) => (
                    <AnimatedSection key={index} 
                    className={`flex flex-col ${section.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}  items-center justify-between gap-8 mb-32 sm:mb-40 md:mb-48 lg:mb-56`}>
                        <div className="w-full lg:w-1/2 space-y-4">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center lg:text-left mb-4">
                                {section.title}
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl text-center lg:text-left">
                                {section.content}
                            </p>
                            {section.list && (
                                <ul className="list-disc pl-5 space-y-2 text-base sm:text-lg md:text-xl">
                                {section.list.map((item, itemIndex) => (
                                    <li key={itemIndex}>{item}</li>
                                ))}
                                </ul>
                            )}
                        </div>
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <Image
                                src="/images/Logo_SinBG.png" //{section.imagen} aqui irian las imagenes pero no las tengo xd
                                alt="Logo" //el nombre de la imagen xd
                                width={240}
                                height={240}
                                className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64"
                                priority //{index === 0}
                            />
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    )
}