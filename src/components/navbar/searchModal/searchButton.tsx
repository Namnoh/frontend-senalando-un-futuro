import { DynamicIcon } from '@/components/customUI/dynamicLucideIcon';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Vista } from '@/interfaces/vistaInterface';
import SearchModal from './searchModal';
import { useEffect, useState } from 'react';
import { SearchPalabra } from '@/interfaces/commonInterfaces';

export default function searchButton({l, isOpen}:{l:Vista, isOpen?:boolean}) {
    const [filteredItems, setFilteredItems] = useState<SearchPalabra[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!isModalOpen) {
            setFilteredItems([])
        }
    }, [isModalOpen]);

    return (
        <Dialog onOpenChange={setIsModalOpen}>
            <DialogTrigger>
                <div
                    key={l.idVista}
                    className={`group mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-primary-800 hover:bg-primary-50 ${isOpen ? 'text-base' : ''}`}
                >
                    <DynamicIcon name={l.iconoVista} classes={`h-5 w-5`}/>
                    {isOpen ? (l.tituloVista) :
                    (
                        <span
                            className="absolute rounded-md px-2 py-1 ml-6 text-nowrap
                            bg-primary-100 text-text-foreground text-sm
                            invisible opacity-20 -translate-x-3 transition-all w-50
                            group-hover:visible group-hover:opacity-100 group-hover:translate-x-10
                            "
                        >
                            {l.tituloVista}
                        </span>
                    )}
                </div>
            </DialogTrigger>
            <SearchModal filteredItems={filteredItems} setFilteredItems={setFilteredItems}/>
        </Dialog>
    )
};