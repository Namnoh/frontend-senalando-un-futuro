import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn'; 
import Image from 'next/image';

const Footer = () => {
  return (
    <footer>
      {/* <div className="flex items-center justify-between"> */}

        {/* <div className="flex items-center space-x-4 ml-1">
          <Image
            src="/images/Logo_SinBG.png"
            alt="Logo"
            width={100}
            height={100}
            className="w-30 h-30"
          />
        </div> */}

        {/* <div className="flex flex-grow items-center justify-center space-x-8">

          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold">Integrantes</h3>
            <div className="flex items-center space-x-4">
              <div className="text-sm">Alfredo Galdames</div>
              <div className="flex space-x-2">
                <a href="https://github.com/mi-perfil-1" target="_blank" rel="noopener noreferrer">
                  <GitHubIcon className="w-6 h-6" />
                </a>
                <a href="https://instagram.com/mi-perfil-1" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com/in/mi-perfil-1" target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm pr-1">Fernando Muñoz</div>
              <div className="flex space-x-2">
                <a href="https://github.com/mi-perfil-2" target="_blank" rel="noopener noreferrer">
                  <GitHubIcon className="w-6 h-6" />
                </a>
                <a href="https://instagram.com/mi-perfil-2" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com/in/mi-perfil-2" target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm pr-6">Jean Venegas</div>
              <div className="flex space-x-2">
                <a href="https://github.com/mi-perfil-3" target="_blank" rel="noopener noreferrer">
                  <GitHubIcon className="w-6 h-6" />
                </a>
                <a href="https://instagram.com/mi-perfil-3" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com/in/mi-perfil-3" target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold">Redes Sociales de <b>SUF</b></h3>
            <div className="flex space-x-4">
              <a href="https://github.com/mi-app" target="_blank" rel="noopener noreferrer">
                <GitHubIcon className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/mi-app" target="_blank" rel="noopener noreferrer">
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/mi-app" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div> */}
      {/* </div> */}

      {/* <div className="text-sm text-center mt-4">
        © 2024 Señalando un Futuro. Todos los derechos reservados.
      </div> */}

      <hr />
      <div className='w-full p-4 min-h-[15vh] md:min-h-[10vh] flex items-center justify-center flex-col gap-2 text-sm text-gray-400'>
        <div className='flex flex-col items-center justify-center gap-2 lg:flex-row lg:gap-4'>
          <div className='flex flex-row items-center justify-center gap-2 md:flex-row md:gap-5 lg:gap-3'>
            <p>Redes Sociales <b>SUF</b></p>
            <div className="flex space-x-4">
              <a href="https://github.com/mi-app" target="_blank" rel="noopener noreferrer">
                <GitHubIcon className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/mi-app" target="_blank" rel="noopener noreferrer">
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/mi-app" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
          <p>Alfredo Galdames | Fernando Muñoz | Jean Venegas</p>
        </div>
        <div className='md:flex md:flex-row md:gap-3 lg:items-center lg:justify-center lg:gap-1 lg:w-full'>
          <p>© 2024 Señalando un Futuro.</p>
          <p>Todos los derechos reservados.</p>
        </div>
      </div>

    </footer>
  );
};
export default Footer;