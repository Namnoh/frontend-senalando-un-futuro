import { DynamicIcon } from '@/components/customUI/dynamicLucideIcon';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Vista } from '@/interfaces/vistaInterface';
import SearchModal from './searchModal';
import { useEffect, useState } from 'react';
import { SearchPalabra } from '@/interfaces/commonInterfaces';
import { useSession } from 'next-auth/react';
import { UserProgress } from '@/interfaces/levelinterface';

export default function searchButton({l, isOpen}:{l:Vista, isOpen?:boolean}) {
    const { data: session, status } = useSession();
    const [filteredItems, setFilteredItems] = useState<SearchPalabra[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [levelProgress, setLevelProgress] = useState<number>();

    const getUserProgress = async () => {
        try {
            if (!session?.user?.id) {
                console.warn('No se ha iniciado sesión o no se puede obtener el ID de usuario');
                return;
            }
            const response = await fetch(`/api/level/fetchUserProgress/${session.user.id}`,{
                cache: 'no-store'
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch userProgress: ${response.statusText}`);
            }
            const fetchedProgress: UserProgress = await response.json();
            setLevelProgress(fetchedProgress.idNivel);
        } catch (err) {
            console.error('Error fetching user progress:', err);
        };
    };

    useEffect(() => {
        if (status === 'authenticated') getUserProgress();
    }, [status])

    useEffect(() => {
        if (!isModalOpen) {
            setFilteredItems([])
        }
    }, [isModalOpen]);

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
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
            <SearchModal levelProgress={levelProgress} setIsModalOpen={setIsModalOpen} filteredItems={filteredItems} setFilteredItems={setFilteredItems}/>
        </Dialog>
    )
};