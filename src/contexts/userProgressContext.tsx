'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProgress } from "@/interfaces/levelinterface";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import SimpleLoading from "@/components/customUI/simpleLoading";

type userProgressContextProviderProps = {
    children: React.ReactNode;
}

type Progress = UserProgress;

type UserProgressContext = {
    progress: Progress | null;
    updateProgress: (newUserProgress: UserProgress) => void;
}

export const UserProgressContext = createContext<UserProgressContext | null>(null);

export default function UserProgressContextProvider({children} : userProgressContextProviderProps) {
    const { data: session, status } = useSession();
    const [progress, setProgress] = useState<Progress | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Función para actualizar progreso
    const updateProgress = async (newUserProgress: UserProgress) => {
        setIsLoading(true)
        try {
            const response = await fetch(`/api/level/updateUserProgress/${newUserProgress.idProgreso}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUserProgress),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch userProgress');
            };
            toast({
                title: "Éxito",
                description: "Progreso actualizado correctamente",
                variant: "success"
            });
            setProgress(newUserProgress);
        } catch (err) {
            const errorMessage = (err instanceof Error) ? err.message : 'Error desconocido';
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false)
        };
    };

    const fetchProgress = async () => {
        setIsLoading(true)
        try {
            if (!session || !session.user?.id) {
                throw new Error('No se ha iniciado sesión o no se puede obtener el ID de usuario');
            }
            const response = await fetch(`/api/level/fetchUserProgress/${session.user.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch userProgress');
            };
            const fetchedProgress: UserProgress = await response.json();
            setProgress(fetchedProgress);
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        };
    };
    
    useEffect(() => {
        if (status === "authenticated") {
            fetchProgress();
        }
    }, [session, status])

    if (isLoading) {
        return <SimpleLoading />
    }

    return (
        <UserProgressContext.Provider value={{ progress, updateProgress }}>
            {children}
        </UserProgressContext.Provider>
    );
};

export function useProgressContext() {
    const context = useContext(UserProgressContext);
    if (!context) {
        throw new Error("useProgressContext debe ser utilizado dentro de UserProgressContextProvider")
    };
    return context;
}