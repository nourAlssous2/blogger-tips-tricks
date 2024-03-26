'use client'
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import $ from 'jquery';

export default function DetectingRoutes() {
    const pathname = usePathname();
    const router = useRouter()
    
    useEffect(() => {
        $('header nav a').each((i, e) => {
            const elementHref = $(e).attr('href')
            if (elementHref === pathname) {
                $(e).addClass(['bg-white', 'text-sky-400']).removeClass('text-white')
            } else {
                $(e).removeClass(['bg-white', 'text-sky-400']).addClass('text-white')
            };
        })
        router.refresh()
    }, [pathname])
    
    return null;
}
