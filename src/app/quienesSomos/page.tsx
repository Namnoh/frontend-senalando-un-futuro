import React from 'react'
import Image from 'next/image'

function quienesSomosPage() {
return (
    <>
    <div className=''>    
        <div className="grid grid-cols-2 grid-rows-1 gap-4">
            <div>
                <img 
                src="" 
                alt="" 
                width={600}
                height={600}
                />
            </div>
            <div>
                <div className="text-left pt-16 text-7xl">
                    <h1 className="text-center"> <b>Nuestra mision</b> </h1>
                </div>
                <div className='pt-16 pr-60 text-xl text-center leading-loose'>
                    <p >Nuestra mision como equipo es ayudar a las personas a aprender el lenguaje de señas de manera simple y divertida, usando videos interactivos y retroalimentación personalizada, para crear un mundo más inclusivo donde todos podamos comunicarnos y entendernos mejor.
                    </p>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-1 gap-4">
            <div>
                <div className="text-left pt-10 text-7xl">
                    <h1 className="text-center"> <b> Inspiracion</b></h1>
                </div>
                <div className='pt-16 pl-60'>
                    <p className='text-center text-xl leading-loose'>
                        Todo comienza con un integrante de nuestro grupo el cual estudio un tiempo lenguaje de señas en Chile, de ahi surgio la idea de crear esta aplicacion, cuando decidimos estudiar mas a fondo el lenguaje de señas, nos percatamos de que hay muchas personas que sufren de perdida auditiva y muy pocas personas saben como comunicarse a traves del lenguaje de señas, asi que decidimos poder aportar de algun modo a esas personas que le interesa y esten dispuestas a aprender este hermoso lenguaje
                    </p>
                </div>
            </div>
            <div>
                <img 
                src="" 
                alt="" 
                width={600}
                height={600}
                />
            </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-1 gap-4">
            <div>
                <img 
                src="" 
                alt="" 
                width={600}
                height={600}
                />
            </div>
            <div>
                <div className="text-left pt-16 text-7xl">
                    <h1 className="text-center"> <b>Impacto Social</b> </h1>
                </div>
                <div className='pt-16 pr-60 text-xl text-center leading-loose' >
                    <p >En nuestro equipo, creemos que la comunicación es un derecho de todos. Con nuestra plataforma, buscamos romper las barreras entre personas sordas y oyentes, promoviendo una sociedad más inclusiva y accesible para todos. 
                        Sabemos que el desconocimiento del lenguaje de señas limita la interacción de las personas con discapacidad auditiva, y queremos cambiar esto.
                        <br />
                        A través de nuestro enfoque interactivo y amigable, estamos capacitando a personas de todas las edades a aprender este hermoso idioma. El impacto va más allá del aprendizaje: estamos construyendo puentes de comunicación que ayudan a mejorar la inclusión en escuelas, lugares de trabajo, y entornos cotidianos. Creemos firmemente que un mundo donde todos puedan entenderse es un mundo más equitativo y mejor para todos.
                    </p>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-1 gap-4">
            <div>
                <div className="text-left pt-10 text-7xl">
                    <h1 className="text-center"> <b> Plan a futuro</b></h1>
                </div>
                <div className='pt-16 pl-60'>
                    <p className='text-center text-xl leading-loose '>
                    Este es solo el comienzo. En el futuro, planeamos expandir nuestra plataforma para llegar a más personas y ofrecer nuevas funcionalidades que mejoren aún más la experiencia de aprendizaje. Aquí te compartimos algunas de nuestras metas a largo plazo:
                    </p>
                    <br />
                    <ul className='list-disc text-xl'>
                        <li><b>Nuevos idiomas de señas:</b> Nos gustaria integrar diferentes lenguajes de señas, como el <b>American Sign Language (ASL)</b> y la <b>Lengua de Señas Mexicana (LSM)</b>, para que personas de diferentes países puedan beneficiarse de nuestra plataforma.</li>
                        <br />
                        <li><b>Cursos especializados:</b> Planeamos ofrecer módulos específicos para sectores como la educación, atención al cliente y turismo, donde la comunicación inclusiva es esencial.</li>
                        <br />
                        <li><b>Colaboración con organizaciones:</b> Queremos aliarnos con escuelas, ONGs y empresas para llevar nuestra plataforma a más espacios, promoviendo la inclusión desde una edad temprana y en lugares donde más se necesita.</li>
                    </ul>
                </div>
            </div>
            <div>
                <img 
                src="" 
                alt="" 
                width={600}
                height={600}
                />
            </div>
        </div>
    </div>
    </>
)
}

export default quienesSomosPage