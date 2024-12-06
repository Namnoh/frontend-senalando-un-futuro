import Image from 'next/image'
import AnimatedSection from '@/components/customUI/animated-section' 
const sections = [
    {
        title: "Nuestra misión",
        content: "Nuestra misión como equipo es ayudar a las personas a aprender el lenguaje de señas de manera simple y divertida, usando videos interactivos y retroalimentación personalizada. Creemos en la importancia de la inclusión y queremos facilitar la comunicación entre personas sordas y oyentes.",
        image: "/images/quienessomos.png"
    },
    {
        title: "Inspiración",
        content: "Todo comienza con un integrante de nuestro grupo que estudió lenguaje de señas en Chile. De ahí surgió la idea de crear esta aplicación. Al profundizar en el tema, nos dimos cuenta de que hay muchas personas con pérdida auditiva y muy pocas que saben comunicarse a través del lenguaje de señas. Decidimos aportar de algún modo a aquellas personas interesadas en aprender este hermoso lenguaje.",
        image: "/svg/inspire.svg"
    },
    {
        title: "Impacto Social",
        content: "En nuestro equipo, creemos que la comunicación es un derecho universal. Con nuestra plataforma, buscamos derribar barreras entre personas sordas y oyentes, promoviendo una sociedad más inclusiva. A través de un enfoque interactivo, capacitamos a personas de todas las edades para aprender el lenguaje de señas, fomentando la inclusión en escuelas, trabajos y la vida cotidiana. Queremos construir un mundo más equitativo donde todos puedan comunicarse y entenderse.",
        image: "/svg/social_impact.svg"
    },
    {
        title: "Plan a futuro",
        content: "Este es solo el comienzo. En el futuro, planeamos expandir nuestra plataforma con nuevas funcionalidades y metas. Nuestros objetivos incluyen integrar lenguajes de señas como ASL y LSM para beneficiar a más personas, ofrecer cursos especializados en áreas como educación, atención al cliente y turismo.",
        image: "/svg/future.svg"
    }
]

export default function sobreNosotros() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-center text-secondary mt-10 mb-32 sm:mb-24 md:mb-32">
                    Sobre <span className='text-primary'>Nosotros</span>
                </h1>
                {sections.map((section, index) => (
                    <AnimatedSection key={index}>
                        <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center justify-between gap-8 mb-32 sm:mb-40 md:mb-48 lg:mb-56`}>
                            <div className="w-full lg:w-1/2 space-y-4">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center lg:text-left mb-4">
                                    {section.title}
                                </h2>
                                <p className="text-base sm:text-lg md:text-xl text-center lg:text-left">
                                    {section.content}
                                </p>
                            </div>
                            <div className="w-full lg:w-1/2 flex justify-center">
                                <Image
                                    src={section.image}
                                    alt={`Ilustración para ${section.title}`}
                                    width={400}
                                    height={400}
                                    className="w-64 h-64 sm:w-80 sm:h-80 md:w-[80%] md:h-96 object-contain"
                                    priority={index === 0}
                                />
                            </div>
                        </div>
                    </AnimatedSection>
                ))}
                
            </div>
        </div>
    )
}