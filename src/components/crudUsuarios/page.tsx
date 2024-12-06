'use client'

import { columns } from "./columns";
import { DataTable } from '@/components/customUI/table/data-table';
import { useCallback, useEffect, useRef, useState } from "react";
import { Usuario } from '@/interfaces/usuarioInterface';

import { TableSkeleton } from "@/components/customUI/skeletons/tableSkeleton";
import FirstOptions from "../../app/(protected)/(admin)/administracion/components/firstOptions";

const CACHE_TIME = 5 * 60 * 1000; // 5 minutos en milisegundos

export default function CrudUsuarios({ onLoad }: { onLoad?: () => void }) {
    const [data, setData] = useState<Usuario[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const cacheRef = useRef<{ data: Usuario[], timestamp: number } | null>(null);

    const fetchUsers = useCallback(async (forceRefresh = false) => {
        const now = Date.now();
        if (!forceRefresh && cacheRef.current && now - cacheRef.current.timestamp < CACHE_TIME) {
            setData(cacheRef.current.data);
            return;
        };

        try {
            setIsLoading(true);
            const response = await fetch('/api/crud/users',{
                cache: 'no-cache'
            });
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            };
            const fetchedData = await response.json();
            setData(fetchedData);
            cacheRef.current = { data: fetchedData, timestamp: now };
            onLoad?.();
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occurred while fetching users'));
        } finally {
            setIsLoading(false);
        };
    }, [onLoad]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const refreshData = () => {
        fetchUsers(true);
    };

    if (error) {
        return <><div>Error: {error.message}</div> <button onClick={refreshData}>Reintentar</button></>;
    };

    return (
        <>
            <FirstOptions refreshData={refreshData} type={'users'}/>
            <div className="container mx-auto py-10 lg:min-w-[800px]">
                {isLoading ? (
                    <TableSkeleton search={true} clear={true} deleteOp={true} columns={true} pagination={true} selectedRows={true} />
                ): (
                    <DataTable columns={columns} data={data}/>
                )}
            </div>
        </>
    )
};