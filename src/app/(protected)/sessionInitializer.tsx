'use client';

import SimpleLoading from "@/components/customUI/simpleLoading";
import UserProgressContextProvider from "@/contexts/userProgressContext";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SessionInitializer({ children }: { children: React.ReactNode }) {
    const { status } = useSession();
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(status === 'loading' ? true : false);
    }, [status])

    if (isLoading) {
        return <SimpleLoading />
    }

    return <UserProgressContextProvider>{children}</UserProgressContextProvider>
}