"use client"
import React from 'react';
// import { useEffect } from 'react';
import 'aos/dist/aos.css'; // Importa los estilos de AOS
// import AOS from 'aos'; // Importa AOS

function quienesSomosPage() {
    // useEffect(() => {
    // AOS.init({
    //   duration: 1000, // Duración de las animaciones
    //   once: true, // Si solo se debe animar una vez al hacer scroll
    // });
    // }, []);

    return (
        <>
        {/* Inicio, div general */}
        <div className='container mx-auto p-4'>
            {/* Sección: Nuestra misión */}
            <div className="flex flex-col  md:flex-row items-center md:items-start md:text-left text-center md:space-x-50 mt-[45%] mb-96" data-aos="zoom-in">
            {/* Imagen */}
                <div className="md:w-1/2 w-full mb-4 md:mb-0 flex justify-center md:justify-center">
                    <img
                    src="https://static.vecteezy.com/system/resources/previews/007/933/127/non_2x/about-us-button-about-us-text-template-for-website-about-us-icon-flat-style-vector.jpg"
                    alt="imagen_about_us"
                    className="w-full h-auto max-w-sm object-contain"/>
                </div>
                {/* Texto */}
                <div className="md:w-1/2 w-full md:pl-8">
                    <h1 className="text-7xl font-bold mb-4">Nuestra misión</h1>
                    <p className="text-2xl leading-relaxed font-medium">
                    Nuestra misión como equipo es ayudar a las personas a aprender el lenguaje de señas de manera simple y divertida, usando videos interactivos y retroalimentación personalizada...
                    </p>
                </div>
            </div>

            {/* Sección: Inspiración */}
            <div className="flex flex-col md:flex-row-reverse items-center md:items-start md:text-left text-center md:space-x-50 mt-[45%] mb-96" data-aos="zoom-in-left">
            {/* Imagen */}
                <div className="md:w-1/2 w-full mb-12 md:mb-0 flex justify-center md:justify-center">
                    <img
                    src="https://cdn-icons-png.flaticon.com/512/4214/4214085.png"
                    alt="Inspiración"
                    className="w-full h-auto max-w-sm object-contain"
                    />
                </div>
                {/* Texto */}
                <div className="md:w-1/2 w-full md:pl-8 md:pr-8">
                    <h1 className="text-7xl font-bold mb-4">Inspiración</h1>
                    <p className="text-2xl leading-relaxed font-medium">
                    Todo comienza con un integrante de nuestro grupo el cual estudio un tiempo lenguaje de señas en Chile, de ahi surgio la idea de crear esta aplicacion, cuando decidimos estudiar mas a fondo el lenguaje de señas,
                    nos percatamos de que hay muchas personas que sufren de perdida auditiva y muy pocas personas saben como comunicarse a traves del lenguaje de señas, asi que decidimos poder aportar de algun modo a esas personas que le interesa y esten dispuestas a aprender este hermoso lenguaje
                    </p>
                </div>
            </div>

            {/* Sección: Impacto Social */}
            <div className="flex flex-col md:flex-row items-center md:items-start md:text-left text-center md:space-x-50 mt-[45%] mb-96" data-aos="zoom-in-right">
                {/* Imagen */}
                <div className="md:w-1/2 w-full mb-4 md:mb-0 flex justify-center md:justify-center">
                    <img
                    src="https://th.bing.com/th/id/OIP.WEYQzxaLAe1HMFkSQqTldgHaHa?rs=1&pid=ImgDetMain"
                    alt="Impacto Social"
                    className="w-full h-auto max-w-sm object-contain"/>
                </div>
                {/* Texto */}
                <div className="md:w-1/2 w-full md:pl-8">
                    <h1 className="text-7xl font-bold mb-4">Impacto Social</h1>
                    <p className="text-2xl leading-relaxed font-medium">
                    En nuestro equipo, creemos que la comunicación es un derecho universal. Con nuestra plataforma, buscamos derribar barreras entre personas sordas y oyentes, promoviendo una sociedad más inclusiva. A través de un enfoque interactivo, capacitamos a personas de todas las edades para aprender el lenguaje de señas, fomentando la inclusión en escuelas, trabajos y la vida cotidiana. Queremos construir un mundo más equitativo donde todos puedan comunicarse y entenderse.
                    </p>
                </div>
            </div>

            {/* Sección: Plan a futuro */}
            <div className="flex flex-col md:flex-row-reverse items-center md:items-start md:text-left text-center md:space-x-50 mt-[45%] mb-96" data-aos="zoom-in-left">
            {/* Imagen */}
                <div className="md:w-1/2 w-full mb-4 md:mb-0 flex justify-center md:justify-center">
                    <img
                    src="https://cdn-icons-png.flaticon.com/512/1636/1636917.png"
                    alt="Plan a Futuro"
                    className="w-full h-auto max-w-sm object-contain"/>
                </div>
                {/* Texto */}
                <div className="md:w-1/2 w-full md:pl-8">
                <h1 className="text-7xl font-bold mb-4">Plan a futuro</h1>
                <p className="text-2xl leading-relaxed font-medium">
                Este es solo el comienzo. En el futuro, planeamos expandir nuestra plataforma con nuevas funcionalidades y metas, como:
                </p>
                <ul className="list-disc pl-4 mt-4 text-left text-2xl leading-relaxed font-medium">
                <li>Integrar lenguajes de señas como ASL y LSM para beneficiar a más personas.</li>
                <br />
                <li>Ofrecer cursos especializados en áreas como educación, atención al cliente y turismo.</li>
                <br />
                <li>Ofrecer cursos especializados en áreas como educación, atención al cliente y turismo.</li>
                </ul>
            </div>
            </div>
        </div>
        </>
    );
}

export default quienesSomosPage;