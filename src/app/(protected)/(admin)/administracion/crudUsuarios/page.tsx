import { getAllUsers } from "@/services/users.service";
import { columns } from "./columns";
import { DataTable } from '@/components/customUI/table/data-table';

export default async function CrudUsuarios() {
    const data = await getAllUsers();

    return (
        <div className="container mx-auto py-10 lg:min-w-[800px]">
            <DataTable columns={columns} data={data}/>
        </div>
    )
}
