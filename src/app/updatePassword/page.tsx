"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirmar la contraseña es obligatorio" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export default function UpdatePasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const queryToken = searchParams.get("token");
    if (queryToken) {
      setToken(queryToken);
    } else {
      toast({
        title: "Error",
        description: "El enlace no es válido o ha expirado.",
        variant: "destructive",
      });
      router.push("/request-reset");
    }
  }, [searchParams, toast, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/auth/reset`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          token, 
          newPassword: values.password,
          confirmPassword: values.confirmPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Contraseña restablecida",
          description: "Tu contraseña ha sido cambiada con éxito.",
        });
        router.push("/login");
      } else {
        throw new Error(data.error || "Ha ocurrido un error al restablecer la contraseña");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Error al restablecer la contraseña",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Cambiar Contraseña</CardTitle>
          <CardDescription>Ingresa tu nueva contraseña.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nueva Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cambiando...
                  </>
                ) : (
                  "Cambiar Contraseña"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}