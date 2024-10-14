import { ColumnDef, Table } from "@tanstack/react-table"

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export type OnlyTableProp<TData> = {
    table: Table<TData>
    filtros?: string[]
};

export type TableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    table: Table<TData>;
}