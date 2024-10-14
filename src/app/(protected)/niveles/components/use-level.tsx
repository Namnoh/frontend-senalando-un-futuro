import { useState, useEffect } from 'react'
import { Nivel, UserProgress } from "@/interfaces/levelinterface"
import { getLevel, getUserProgress } from "@/services/level.service"

export function useLevelData(levelId: number) {
    const [levelData, setLevelData] = useState<Nivel | null>(null)
    const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const [levelData, progressData] = await Promise.all([
                getLevel(levelId),
                getUserProgress()
                ])
                if (levelData) {
                setLevelData(levelData)
                setUserProgress(progressData)
                } else {
                setError('No se encontró el nivel')
                }
            } catch (err) {
                setError('Error al cargar los datos')
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [levelId])

    return { levelData, userProgress, isLoading, error }
}