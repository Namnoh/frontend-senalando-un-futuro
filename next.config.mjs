// /** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      // Agrega aquí el dominio de la imagen
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.gifer.com',
          // port: '',
          // pathname: ''
        }
      ]
    },
};

export default nextConfig;