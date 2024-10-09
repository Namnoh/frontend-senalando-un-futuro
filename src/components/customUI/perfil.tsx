import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, UserRoundPen } from "lucide-react"

export function ProfileHeader({ name, username }: { name: string; username: string }) {
    return (
        <div className="flex flex-col items-center mb-6">
            <h2 className="text-xl font-semibold bg-background">{name}</h2>
            <p className="text-sm text-gray-500">@{username}</p>
        </div>
    )
}

export function ToggleButtons({ activeView, setActiveView }: { activeView: 'edit' | 'favorites'; setActiveView: (view: 'edit' | 'favorites') => void }) {
    return (
        <div className="bg-white rounded-full p-1 flex justify-center mb-6 shadow-md">
            <Button 
                variant={activeView === 'edit' ? "default" : "ghost"}
                className="flex-1 rounded-full"
                onClick={() => setActiveView('edit')}
            >
                <UserRoundPen className="w-4 h-4 mr-2" />
                Editar
            </Button>
            <Button 
                variant={activeView === 'favorites' ? "default" : "ghost"}
                className="flex-1 rounded-full"
                onClick={() => setActiveView('favorites')}
            >
                <Heart className="w-4 h-4 mr-2 bg-des" />
                Favoritos
            </Button>
        </div>
    )
}

export function EditProfile({ progress }: { progress: number }) {
    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="email" className="text-sm font-medium">Correo</label>
                <p className="mt-1 "> miau.venegas@duocuc.cl</p>
            </div>
            
            <div>
                <label htmlFor="new-password" className="text-sm font-medium">Cambiar Contraseña</label>
                <Input id="new-password" type="password" placeholder="Nueva Contraseña" className="mt-1 borser-2 border-black placeholder-black" />
                <Input id="repeat-password" type="password" placeholder="Repetir Contraseña" className="mt-2 borser-2 border-black placeholder-secondary"  />
            </div>
            
            <div>
                <label className="text-sm font-medium">Progreso Niveles</label>
                <p className="text-sm text-gray-500">
                    Basico
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                    style={{ width: `${progress}%` }}>

                    </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{progress}% completado</p>
            </div>
        </div>
    )
}


export function Favorites() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="aspect-square">
                <span className="text-2xl" role="img" aria-label="Perro">🐶</span>
            </Button>
            <Button variant="outline" className="aspect-square">
                <span className="text-2xl" role="img" aria-label="Pájaro">🐦</span>
            </Button>
            <Button variant="outline" className="aspect-square">
                <span className="text-2xl" role="img" aria-label="Elefante">🐘</span>
            </Button>
            <Button variant="outline" className="aspect-square">
                <span className="text-2xl" role="img" aria-label="Caballo">🐴</span>
            </Button>
        </div>
    )
}