'use client'

import { OnlyTableProp } from '@/interfaces/dataTableProps'
import { Button } from "@/components/ui/button";
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function PaginationBtns<TData>({table}:OnlyTableProp<TData>) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const updatePageInUrl = (newPage: number) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        current.set('page', newPage.toString())
        const search = current.toString()
        const query = search ? `?${search}` : ''
        router.push(`${window.location.pathname}${query}`)
    }

    useEffect(() => {
        const page = searchParams.get('page')
        if (page) {
            const pageNumber = parseInt(page, 10)
            if (!isNaN(pageNumber) && pageNumber !== table.getState().pagination.pageIndex + 1) {
                table.setPageIndex(pageNumber - 1)
            }
        }
    }, [searchParams, table])

    const handlePreviousPage = () => {
        if (table.getCanPreviousPage()) {
            const newPage = table.getState().pagination.pageIndex
            updatePageInUrl(newPage)
            table.previousPage()
        }
    }

    const handleNextPage = () => {
        if (table.getCanNextPage()) {
            const newPage = table.getState().pagination.pageIndex + 2
            updatePageInUrl(newPage)
            table.nextPage()
        }
    }

    return (
        <div className="space-x-4">
            <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={!table.getCanPreviousPage()}
            >
                Anterior
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={!table.getCanNextPage()}
            >
                Siguiente
            </Button>
        </div>
    )
};