'use client'

import styles from "@/app/styles/home.module.scss"
import React, { useState, useCallback, useEffect, useRef } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import SelectionTabs from "./selectionTabs";
import CrudCategorias from "../crudCategorias/page";
import CrudPalabras from "../crudPalabras/page";
import CrudUsuarios from "../crudUsuarios/page";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CRUD() {
    const [loadedTabs, setLoadedTabs] = useState<Set<string>>(new Set());
    const tabParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const isInitialMount = useRef(true);

    const activeTab = tabParams.get('tab') || 'users';

    const onTabLoad = useCallback((tabName: string) => {
        setLoadedTabs(prev => new Set(prev).add(tabName))
    }, []);

    const handleTabChange = useCallback((tab: string) => {
        const params = new URLSearchParams(tabParams);
        if (params.get('tab') !== tab) {
            params.set('tab', tab);
            params.set('page', '1');
            replace(`${pathName}?${params.toString()}`, { scroll: false });
        };
    }, [tabParams, pathName, replace]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            if (!tabParams.get('tab')) {
                handleTabChange('users');
            };
        };
    }, [tabParams, handleTabChange]);

    return (
        <div className={`${styles.backgroundImage} h-full`}>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full h-full flex flex-col items-center justify-center">
                <SelectionTabs activeTab={activeTab} />
                <div className='flex-grow'>
                    <TabsContent value="users">
                        {(loadedTabs.has('users')) ? (
                            <CrudUsuarios />
                        ) : (
                            <React.Suspense>
                                <CrudUsuarios onLoad={() => onTabLoad('users')} />
                            </React.Suspense>
                        )}
                    </TabsContent>
                    <TabsContent value="categories">
                        {(loadedTabs.has('categories')) ? (
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
        </div>
    )
};