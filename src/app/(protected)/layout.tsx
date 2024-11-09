'use client';

import { SessionProvider } from "next-auth/react";
import SessionInitializer from "./sessionInitializer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <SessionProvider>
            <SessionInitializer>
                {children}
            </SessionInitializer>
        </SessionProvider>
    );
};