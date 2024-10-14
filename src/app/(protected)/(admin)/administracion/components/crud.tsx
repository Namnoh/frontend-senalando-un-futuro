'use client'

import React, { useState, useCallback } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import SelectionTabs from "./selectionTabs";
import CrudCategorias from "../crudCategorias/page";
import CrudPalabras from "../crudPalabras/page";
import CrudUsuarios from "../crudUsuarios/page";

// import { lazy } from "react";
// const CrudCategorias  = lazy(() => import("../crudCategorias/page"));
// const CrudPalabras = lazy(() => import("../crudPalabras/page"));
// const CrudUsuarios = lazy(() => import("../crudUsuarios/page"));

export default function CRUD() {
    const [loadedTabs, setLoadedTabs] = useState<Set<string>>(new Set())

    const onTabLoad = useCallback((tabName: string) => {
        setLoadedTabs(prev => new Set(prev).add(tabName))
    }, [])
    return (
        <Tabs defaultValue="users" className="w-full h-full flex flex-col items-center justify-center">
            <SelectionTabs />
            <div className='flex-grow'>
                <TabsContent value="users">
                    {loadedTabs.has('users') ? (
                        <CrudUsuarios />
                    ) : (
                        <React.Suspense>
                            <CrudUsuarios onLoad={() => onTabLoad('users')} />
                        </React.Suspense>
                    )}
                </TabsContent>
                <TabsContent value="categories">
                    {loadedTabs.has('categories') ? (
                        <CrudCategorias />
                    ) : (
                        <React.Suspense>
                            <CrudCategorias onLoad={() => onTabLoad('categories')} />
                        </React.Suspense>
                    )}
                </TabsContent>
                <TabsContent value="words">
                    {loadedTabs.has('words') ? (
                        <CrudPalabras />
                    ) : (
                        <React.Suspense>
                            <CrudPalabras onLoad={() => onTabLoad('words')} />
                        </React.Suspense>
                    )}
                </TabsContent>
            </div>
        </Tabs>
    )
};