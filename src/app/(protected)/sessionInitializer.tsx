'use client'

import SimpleLoading from "@/components/customUI/simpleLoading"
import UserProgressContextProvider from "@/contexts/userProgressContext"
import { useSession } from "next-auth/react"

export default function SessionInitializer({ children }: { children: React.ReactNode }) {
    const { status } = useSession()

    if (status === "loading") {
        return <SimpleLoading />
    }

    return <UserProgressContextProvider>{children}</UserProgressContextProvider>
}