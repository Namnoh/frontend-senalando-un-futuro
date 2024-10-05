import withPWA from "next-pwa";

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

const configWithPWA = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV == 'development'
});

export default configWithPWA({
  ...nextConfig,
});

// export default nextConfig;