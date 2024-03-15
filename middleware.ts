import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { StorageKeysEnum } from "./app/enums/storage-keys.enum"
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
    // @ts-ignore
    const token = cookies().get(StorageKeysEnum.GINGADO_TOKEN)

    if(!token) return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
    matcher: '/admin/',
}