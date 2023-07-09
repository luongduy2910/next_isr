import Head from 'next/head'
import {FC , ReactNode} from 'react'
import {BadgeCheckIcon} from '@heroicons/react/solid'

type Props = {
    title : string
    children : ReactNode
}

export const Layout : FC<Props> = ({title = 'Note app' , children}) => {
    return (
        <div className='flex flex-col min-h-screen justify-center font-mono items-center text-gray-800'>
            <Head>{title}</Head>
            <header></header>
            <main className='flex flex-1 flex-col w-screen items-center justify-center'>
                {children}
            </main>
            <footer className='flex h-12 w-full items-center justify-center border-t'>
                <BadgeCheckIcon className='h-6 w-6 text-blue-500'/>
            </footer>
        </div>
    )
}
