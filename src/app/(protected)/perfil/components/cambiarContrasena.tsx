'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { perfilService } from '@/services/perfil.service'
import { DynamicIcon } from "@/components/customUI/dynamicLucideIcon"

export default function CambiarContraseña() {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess(false)

        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden')
            return
        }

        if (newPassword.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres')
            return
        }

        setIsLoading(true)
        try {
            await perfilService.cambiarContraseña(newPassword)
            setSuccess(true)
            setNewPassword('')
            setConfirmPassword('')
        } catch (error) {
            setError('Error al cambiar la contraseña. Por favor, intente de nuevo.')
        } finally {
            setIsLoading(false)
        }
    }

    return ( 
        <form onSubmit={handleChangePassword} className="space-y-4">
            <h3 className="lg:text-2xl sm:text-xl font-semibold text-black">Cambiar contraseña</h3>
            <div className="lg:ml-10 space-y-4 w-full sm:w-auto ">
                <Input
                    className=" h-10 bg-gray-50 border-secondary-500"
                    type="password"
                    placeholder="Nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={8}
                    aria-label="Nueva contraseña"
                />
                <Input
                    className=" h-10 border-secondary-500 bg-gray-50"
                    type="password"
                    placeholder="Confirmar nueva contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    aria-label="Confirmar nueva contraseña"
                />
            </div>
            {error && (
                <p className="text-red-500 text-sm" role="alert">
                    <DynamicIcon name="AlertCircle" classes="w-4 h-4 inline mr-1" />
                    {error}
                </p>
            )}
            {success && (
                <p className="text-green-500 text-sm" role="alert">
                    <DynamicIcon name="CheckCircle" classes="w-4 h-4 inline mr-1" />
                    Contraseña cambiada exitosamente
                </p>
            )}
            <div className="flex justify-center items-center">
                <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-48 items- bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    {isLoading ? (
                        <>
                            <DynamicIcon name="Loader2" classes="w-4 h-4 mr-2 animate-spin" />
                            Cambiando...
                        </>
                    ) : 'Cambiar Contraseña'}
                </Button>
            </div>
        </form>
    )
}