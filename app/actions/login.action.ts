"use server"

import { cookies } from "next/headers"
import { StorageKeysEnum } from "../enums/storage-keys.enum"
import { randomBytes } from "crypto"

export default async function login(prevState: any, form: FormData) {

    const username = form.get('username')
    const password = form.get('password')

    const USERNAME_ENV = process.env.NEXT_PUBLIC_USERNAME
    const PASSWORD_ENV = process.env.NEXT_PUBLIC_PASSWORD

    if ((username == USERNAME_ENV) && (password == PASSWORD_ENV)) {

        const token = randomBytes(48).toString('hex')

        const thirthDays = 1000 * 60 * 60 * 24 * 30

        cookies().set(StorageKeysEnum.GINGADO_TOKEN, token, {expires: Date.now() + thirthDays})

        return {
            error: "",
            result: "/admin",
        }
    }


    return {
        error: "E-mail ou senha incorretos",
        result: "",
    }
}