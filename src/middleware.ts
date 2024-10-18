import withAuth from "next-auth/middleware";
import { NextResponse, type NextRequest } from "next/server";
export { withAuth } from "next-auth/middleware";

function middleware(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    const token = request.cookies.get('next-auth.session-token')?.value;
    const isAuth = !!token;

    // Redirect authenticated users away from login and register pages
    if (isAuth && (pathName === '/login' || pathName === '/register')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (pathName.startsWith('/niveles')) {
        // const isMatch = /^\/niveles\/\d+$/.test(pathName);
        const levelMatch = pathName.match(/^\/niveles\/(\d+)/);
        const categoryMatch = pathName.match(/^\/niveles\/.+\/categorias\/(\d+)/);
        const wordMatch = pathName.match(/^\/niveles\/.+\/categorias\/.+\/palabras\/(\d+)/);
        // ? Idea de lógica: verificar nivel, si hay nivel, verificar categoría | si no hay, redirigir a categorías de nivel | si hay categoria, redirigir a palabras del nivel y categoría
        if (!pathName.endsWith('/categorias') && !pathName.endsWith('/palabras') && levelMatch && !categoryMatch && !wordMatch) {
            const number = Number(levelMatch[1]);
            // ? Creo que acá podría usar la lógica de Object Literal para simplificar el proceso y código
            switch (number) {
                case 1:
                    return NextResponse.redirect(new URL(`/niveles/1-${encodeURIComponent('básico')}/categorias`, request.url));
                case 2:
                    return NextResponse.redirect(new URL(`/niveles/2-${encodeURIComponent('intermedio')}/categorias`, request.url));
                case 3:
                    return NextResponse.redirect(new URL(`/niveles/3-${encodeURIComponent('avanzado')}/categorias`, request.url));
                default:
                    return NextResponse.redirect(new URL(`/niveles/`, request.url));
            }
        } else if (pathName.includes('/categorias') && !pathName.endsWith('/palabras') && levelMatch && categoryMatch && !wordMatch) {
            // TODO: mejorar lógica y además ver si es factible arreglar la url a la correcta antes de redirigir
            return NextResponse.redirect(new URL(`/niveles/${levelMatch[1]}/categorias/${categoryMatch[1]}/palabras`, request.url));
        }
    }
    // Si no se ha realizado ninguna redirección, continuar con la solicitud original
    return NextResponse.next();
};

// Exportar el middleware envuelto con withAuth de NextAuth
export default withAuth(middleware, {
    callbacks: {
        authorized: ({ token, req }) => {
            const path = req.nextUrl.pathname;
            // Allow access to login and register pages for unauthenticated users
            if (path === '/login' || path === '/register') {
                return true;
            }
            // Require authentication for other protected routes
            return !!token;
        }
    },
});

// * Estas son las rutas en las que se ejecutaría el middleware anterior
export const config = {
    matcher: ['/niveles/:path*', '/perfil', '/administracion/:path*', '/login', '/register']
};