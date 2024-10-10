import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DeleteBtn } from "./deleteBtn";
import { Dialog } from "@/components/ui/dialog";
import { EditCreateBtn } from "./editCreateBtn";

export default function CrudOptions({item}: {item:any}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir acciones</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <Dialog>
                    <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        className="hover:bg-accent hover:text-white"
                    >
                        <EditCreateBtn create={false} item={item}/>
                    </DropdownMenuItem>
                </Dialog>
                <DropdownMenuSeparator />
                <Dialog>
                    <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        className="focus:bg-destructive-400 hover:bg-destructive-400 focus:text-white hover:text-white"
                    >
                        <DeleteBtn id={item.id}/>
                    </DropdownMenuItem>
                </Dialog>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}