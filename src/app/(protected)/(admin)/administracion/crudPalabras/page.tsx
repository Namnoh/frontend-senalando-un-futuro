'use client'

import { getAllWords } from "@/services/words.service";
import { columns } from "./columns";
import { DataTable } from '@/components/customUI/table/data-table';
import { useEffect, useMemo, useState } from "react";
import { Palabra } from "@/interfaces/palabraInterface";
import { TableSkeleton } from "@/components/customUI/skeletons/tableSkeleton";
import FirstOptions from "../components/firstOptions";

export default function CrudPalabras({ onLoad }: { onLoad?: () => void }) {
    const [data, setData] = useState<Palabra[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const [lastUpdated, setLastUpdated] = useState<number>(Date.now())

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true)
            try {
                const fetchedData = await getAllWords()
                setData(fetchedData)
                setIsLoading(false)
                onLoad?.()
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An error occurred while fetching words'))
                setIsLoading(false)
            }
        }

        fetchUsers()
    }, [onLoad, lastUpdated])

    const memoizedData = useMemo(() => data, [data])

    const refreshData = () => {
        setLastUpdated(Date.now())
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <>
            <FirstOptions refreshData={refreshData} type={'words'}/>
            <div className="container mx-auto py-10 lg:min-w-[800px]">
                {isLoading ? <TableSkeleton search={true} clear={true} columns={true} pagination={true} selectedRows={true} /> : <DataTable columns={columns} data={memoizedData}/> }
            </div>
        </>
    )
};