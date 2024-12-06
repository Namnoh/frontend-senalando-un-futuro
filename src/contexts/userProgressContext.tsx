'use client'

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { UserProgress } from "@/interfaces/levelinterface";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import SimpleLoading from "@/components/customUI/simpleLoading";

type UserProgressContextProviderProps = {
    children: React.ReactNode;
}

type Progress = UserProgress;

type UserProgressContextType = {
    progress: Progress | null;
    updateProgress: (newUserProgress: UserProgress) => Promise<void>;
    updateUserProgress: (newUserProgress: UserProgress) => Promise<void>;
    isLoading: boolean;
}

const UserProgressContext = createContext<UserProgressContextType | null>(null);

export default function UserProgressContextProvider({children} : UserProgressContextProviderProps) {
    const { data: session, status } = useSession();
    const [progress, setProgress] = useState<Progress | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const updateProgress = async (newUserProgress: UserProgress) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/level/updateUserProgress/${newUserProgress.idProgreso}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUserProgress),
            });
            if (!response.ok) {
                throw new Error(`Failed to update userProgress: ${response.statusText}`);
            }
            toast({
                title: "Éxito",
                description: "Progreso actualizado correctamente",
                variant: "success"
            });
            setProgress(newUserProgress);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido al actualizar el progreso';
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const updateUserProgress = async (newUserProgress: UserProgress) => {
        setIsLoading(true);
        try {
            if (!session) return;
            const response = await fetch(`/api/progress/updateUserProgress/${session.user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUserProgress),
            });
            if (!response.ok) {
                throw new Error(`Failed to update userProgress: ${response.statusText}`);
            }
            const updatedProgress = await response.json();
            setProgress(updatedProgress);
            toast({
                title: "Éxito",
                description: "Progreso del usuario actualizado correctamente",
                variant: "success"
            });
            fetchProgress();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido al actualizar el progreso';
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProgress = async () => {
        setIsLoading(true);
        try {
            if (!session?.user?.id) {
                console.warn('No se ha iniciado sesión o no se puede obtener el ID de usuario');
                return;
            }
            const response = await fetch(`/api/level/fetchUserProgress/${session.user.id}`,{
                cache: 'no-cache'
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch userProgress: ${response.statusText}`);
            }
            const fetchedProgress: UserProgress = await response.json();
            setProgress(fetchedProgress);
        } catch (err) {
            console.error('Error fetching user progress:', err);
            toast({
                title: "Error",
                description: "No se pudo cargar el progreso del usuario",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        if (status === "authenticated" && !progress) {
            fetchProgress();
        }
    }, [status]);

    const contextValue = useMemo(() => ({
        progress,
        updateProgress,
        updateUserProgress,
        isLoading
    }), [progress, isLoading]);

    if (isLoading) {
        return <SimpleLoading />;
    }

    return (
        <UserProgressContext.Provider value={contextValue}>
            {children}
        </UserProgressContext.Provider>
    );
}

export function useProgressContext(): UserProgressContextType {
    const context = useContext(UserProgressContext);
    if (!context) {
        throw new Error("useProgressContext debe ser utilizado dentro de UserProgressContextProvider");
    }
    return context;
}