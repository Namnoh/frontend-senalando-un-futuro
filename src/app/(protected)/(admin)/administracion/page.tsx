import React from 'react'
import { Tabs, TabsContent } from "@/components/ui/tabs"
import CrudPalabras from './crudPalabras/page'
import CrudUsuarios from './crudUsuarios/page'
import CrudCategorias from './crudCategorias/page'
import SelectionTabs from './components/selectionTabs'

export default function AdministracionPage({ children } : { children: React.ReactNode }) {
    return (
        <>
            <Tabs defaultValue="users" className="w-full h-full flex flex-col items-center justify-center">
                <SelectionTabs />
                <div className='flex-grow'>
                    <TabsContent value="users">
                        <CrudUsuarios />
                    </TabsContent>
                    <TabsContent value="categories">
                        <CrudCategorias />
                    </TabsContent>
                    <TabsContent value="words">
                        <CrudPalabras />
                    </TabsContent>
                </div>
            </Tabs>
        </>
    )
}
