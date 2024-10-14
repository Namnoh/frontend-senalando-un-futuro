'use client'

import React, { useState, useCallback, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import SelectionTabs from "./selectionTabs";
import CrudCategorias from "../crudCategorias/page";
import CrudPalabras from "../crudPalabras/page";
import CrudUsuarios from "../crudUsuarios/page";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


// import { lazy } from "react";
// const CrudCategorias  = lazy(() => import("../crudCategorias/page"));
// const CrudPalabras = lazy(() => import("../crudPalabras/page"));
// const CrudUsuarios = lazy(() => import("../crudUsuarios/page"));

export default function CRUD() {
    const [loadedTabs, setLoadedTabs] = useState<Set<string>>(new Set())
    const [activeTab, setActiveTab] = useState('users');
    const tabParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    const onTabLoad = useCallback((tabName: string) => {
        setLoadedTabs(prev => new Set(prev).add(tabName))
    }, [])

    function handleTabChange(tab:string){
        setActiveTab(tab)
        const params = new URLSearchParams(tabParams);
        params.set('tab',tab);
        params.set('page','1');
        replace(`${pathName}?${params.toString()}`);
    }

    useEffect(() => {
        const params = new URLSearchParams(tabParams);
        const currentTab = params.get('tab')
        if (!currentTab) {
            params.set('tab','users');
            params.set('page','1');
            replace(`${pathName}?${params.toString()}`);
            setActiveTab('users')
        } else {
            setActiveTab(currentTab)
        }
    }, [activeTab, tabParams])
    return (
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full h-full flex flex-col items-center justify-center">
            <SelectionTabs activeTab={activeTab} />
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