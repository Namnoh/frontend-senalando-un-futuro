import { getAllUsers } from "@/services/users.service";
import { Payment, columns } from "./columns";
import { DataTable } from '@/components/customUI/table/data-table';


async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "72412e1vfdfd52f",
            amount: 275,
            status: "processing",
            email: "miau.venegas@example.com",
        },
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "72412e1vfdfd52f",
            amount: 275,
            status: "processing",
            email: "miau.venegas@example.com",
        },
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "72412e1vfdfd52f",
            amount: 275,
            status: "processing",
            email: "miau.venegas@example.com",
        },
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "72412e1vfdfd52f",
            amount: 275,
            status: "processing",
            email: "miau.venegas@example.com",
        },
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "72412e1vfdfd52f",
            amount: 275,
            status: "processing",
            email: "miau.venegas@example.com",
        },
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "72412e1vfdfd52f",
            amount: 275,
            status: "processing",
            email: "miau.venegas@example.com",
        },
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "72412e1vfdfd52f",
            amount: 275,
            status: "processing",
            email: "miau.venegas@example.com",
        },
        // ...
    ]
}

export default async function DemoPage() {
    const data = await getAllUsers();

    return (
        <div className="container mx-auto py-10 lg:min-w-[600px]">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
