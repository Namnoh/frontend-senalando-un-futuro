import withPWA from "next-pwa";

// /** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    // Agrega aquí el dominio de la imagen
    // remotePatterns: [
    //   {
    //     // protocol: '',
    //     // hostname: '',
    //     // port: '',
    //     // pathname: ''
    //   }
    // ]
  },
  productionBrowserSourceMaps: false, // Deshabilita los source maps en producción
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    return config;
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