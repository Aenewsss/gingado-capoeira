"use client"

import { Disclosure, } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from 'react'
import InstagramIcon from './InstagramIcon'
import { CONTATO } from '../data/contato'

const navigation = [
    { name: 'Gingado Capoeira', href: '/#sobre', current: false },
    { name: 'Graduação', href: '/#sistema', current: false },
    { name: 'Eventos', href: '/#eventos', current: false },
    { name: 'Galeria', href: '/#galeria', current: false },
    { name: 'Nossa Sede', href: '/#sede', current: true },
    { name: 'Transparência', href: '/transparencia', current: false },
]

const SECTION_IDS = navigation.map(item => item.href.split('#')[1]).filter(Boolean)

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function useScrollState(enabled: boolean) {
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('')

    useEffect(() => {
        if (!enabled) return

        function onScroll() {
            setScrolled(window.scrollY > 40)
            const marker = window.innerHeight * 0.35
            const current = SECTION_IDS.findLast(id => {
                const element = document.getElementById(id)
                return element ? element.getBoundingClientRect().top <= marker : false
            })
            setActiveSection(current ?? '')
        }

        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [enabled])

    return { scrolled, activeSection }
}

interface IProps {
    overlay?: boolean
}

export default function Navbar({ overlay = false }: IProps) {
    const { scrolled, activeSection } = useScrollState(overlay)

    const isActive = (href: string) => overlay && href.endsWith(`#${activeSection}`)

    return (
        <Disclosure
            as="nav"
            className={classNames(
                'bg-white',
                overlay ? 'fixed inset-x-0 top-0 z-50 transition-shadow duration-500' : '',
                overlay && scrolled ? 'shadow-lg shadow-black/5' : '',
            )}
        >
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className={classNames('relative flex items-center justify-between transition-all duration-500', overlay && scrolled ? 'h-16 sm:h-20' : 'h-20 sm:h-24')}>
                            <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link href="/">
                                        <Image
                                            className={classNames('w-auto transition-all duration-500', overlay && scrolled ? 'h-10 sm:h-14' : 'h-12 sm:h-20')}
                                            src="/logo-completa.svg"
                                            alt="Associação Cultural Gingado Capoeira"
                                            width={300}
                                            height={200}
                                        />
                                    </Link>
                                </div>

                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0">
                                <div className="hidden lg:ml-6 lg:block">
                                    <div className="flex items-center space-x-1 lg:space-x-3">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-black text-white hover:scale-105 transition-transform' : 'text-black',
                                                    !item.current ? "relative after:absolute after:left-3 after:right-3 after:bottom-1 after:h-0.5 after:bg-red-600 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100" : '',
                                                    !item.current && isActive(item.href) ? 'after:scale-x-100 font-semibold' : 'after:scale-x-0',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                        <a href={CONTATO.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram da Gingado Capoeira" className="ml-1 inline-flex w-9 h-9 items-center justify-center rounded-full text-black hover:bg-red-600 hover:text-white transition-colors">
                                            <InstagramIcon />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="lg:hidden bg-white">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-black text-white hover:scale-105' : 'text-black hover:font-semibold',
                                        'block rounded-md px-3 py-2 text-base font-medium '
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                            <a href={CONTATO.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-black hover:font-semibold">
                                <InstagramIcon /> @{CONTATO.instagram}
                            </a>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
