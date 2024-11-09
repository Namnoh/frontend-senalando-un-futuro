import { useState, useEffect } from 'react';
import { Nivel, UserProgress } from "@/interfaces/levelinterface";
import { getLevel } from '@/services/common.service';

export function useLevelData(levelId: number, userId: UserProgress) {
    const [levelData, setLevelData] = useState<Nivel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Usar getLevel pasando levelId y userId
                const levelDataResponse = await getLevel(levelId, userId);

                if (levelDataResponse) {
                    setLevelData(levelDataResponse);
                } else {
                    setError('No se encontró el nivel');
                }
            } catch (err) {
                setError('Error al cargar los datos');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [levelId, userId]); // Asegúrate de que ambos sean dependencias

    return { levelData, isLoading, error };
}
