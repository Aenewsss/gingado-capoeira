"use client"

import Image from "next/image";
import Link from "next/link";
import { useFormState } from "react-dom";
import login from "../actions/login.action";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {

    const router = useRouter()

    const [actionMessage, formAction] = useFormState(login, { error: "", result: "" })

    useEffect(() => {
        if (actionMessage.error) alert(actionMessage.error)
        else router.push(actionMessage.result)
    }, [actionMessage]);

    return (
        <main className="bg-white flex h-screen gap-4 flex-col justify-center items-center">
            <Image src="/logo-completa.svg" width={500} height={300} alt="Logo Gingado Capoeira" />
            <div className="w-full max-w-xs">
                <form action={formAction} className="bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="username">
                            Usuário
                        </label>
                        <input required name="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Usuário" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="password">
                            Senha
                        </label>
                        <input required name="password" className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Entrar
                        </button>
                    </div>
                </form>
                <p className="text-center text-blue-950 text-xs">
                    <Link href="https://aenamartinelli.com.br" target="_blank">
                        &copy;2024 Aenã Martinelli. All rights reserved.
                    </Link>
                </p>
            </div>
        </main>
    )
}