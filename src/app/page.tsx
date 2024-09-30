"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { FaClock } from "react-icons/fa6";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/utils/schema-form-rules/login";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { getSession, signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type LoginForm = z.infer<typeof loginSchema>;

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(false);
  };

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    const { password, email } = data;
    toast(
      <div>
        <p>🦄 So easy</p>
        <p>usuário: {email}</p>
        <p>senha: {password}</p>
        <p>
          (Utilize o react-toastfy para exibir notificações para o usuario, não
          deixe o usuário realizar uma ação sem aparecer nada, obrigado!)
        </p>
      </div>,
    );

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return;
    }
    const session = await getSession();
    toast.success("Login efetuado com sucesso! :)", {
      position: "bottom-center",
    });
    console.log(session);
  };

  return (
    <div className="h-max py-12 lg:h-dvh lg:w-[100dvw] flex items-center justify-center gap-5">
      <div className="flex flex-col lg:flex-row items-center flex-wrap gap-6">
        <Dialog open={isModalOpen} onOpenChange={toggleModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Shadcn Components e React Icons</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p>
                Utilize os componentes do shadcn para a construção padrão do seu
                layout.
              </p>
              <Link
                href={"https://ui.shadcn.com/docs"}
                target="_blank"
                className="text-blue-500"
              >
                https://ui.shadcn.com/docs
              </Link>
              <p>
                Utilize os ícones do React-Icons, não instale outras bibliotecas
                de componentes a menos que seja necessário.
              </p>
              <Link
                href={"https://react-icons.github.io/react-icons/"}
                target="_blank"
                className="text-blue-500"
              >
                https://react-icons.github.io/react-icons/
              </Link>
              <div className="text-center text-red-500 text-sm mt-2 flex flex-col items-center justify-center gap-3 w-full">
                <span>
                  Por que usar outra lib se você tem esse relógio maneiro ?
                </span>
                <div className="w-[70px]">
                  <FaClock className="clock-icon mr-2" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={toggleModal}>Okay</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 grid"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite sua senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Enviar</Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              Informações
            </Button>
          </form>
        </Form>
        <div>
          <Card className="max-w-[300px]">
            <CardHeader>
              <CardTitle>Validação de login</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <p className="text-sm">
                O padrão de autenticação implementado aqui é o NextAuth
              </p>
              <div className="text-gray-500">
                <p className="text-black">Tente os seguintes valores:</p>
                <p>email: test@example.com</p>
                <p>senha: password123</p>
              </div>
            </CardContent>
            <CardFooter className="grid gap-3">
              <p>
                Caso a autenticação seja concluida, será adicionado o cookie
                (next-auth.session-token) no seu navegador com as informações
                criptografadas do seu usuário.
              </p>
              <Link
                target="_blank"
                href={"https://next-auth.js.org/getting-started/example"}
                className="text-blue-500"
              >
                Mais informações
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
