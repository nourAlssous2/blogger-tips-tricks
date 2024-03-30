import './globals.css'
import '../lib/fontawesome/css/all.min.css'
import localFont from 'next/font/local'
import Header from '@/components/Header/Header'
import DetectingRoutes from '@/components/DetectingRoutes/DetectingRoutes'
import isAuth from '@/lib/funcs/isAuth'
import { cookies } from 'next/headers'
import dynamic from 'next/dynamic'

export const maxDuration = 10;

export const cairo = localFont({
    src: [
        {
            path: '../lib/fonts/cairo/Cairo-ExtraLight.ttf',
            weight: '200',
        },
        {
            path: '../lib/fonts/cairo/Cairo-Light.ttf',
            weight: '300',
        },
        {
            path: '../lib/fonts/cairo/Cairo-Regular.ttf',
            weight: '400',
        },
        {
            path: '../lib/fonts/cairo/Cairo-Medium.ttf',
            weight: '500',
        },
        {
            path: '../lib/fonts/cairo/Cairo-SemiBold.ttf',
            weight: '600',
        },
        {
            path: '../lib/fonts/cairo/Cairo-Bold.ttf',
            weight: '700',
        },
        {
            path: '../lib/fonts/cairo/Cairo-ExtraBold.ttf',
            weight: '800',
        },
    ],
    variable: '--font-cairo',
    preload: true
})

export const metadata = {
    title: 'Blogger Tips Tricks - Welcome',
    description: 'Welcome to blogger tips tricks, the best place for reading and writing blogs',
}

export default async function RootLayout({ children }) {
    const data = await isAuth('profile').then(res => res);
    let user = false;
    if (data) {
        user = data;
    }
    const cookie = cookies();
    const language = cookie.get('lang')?.value === '1' ? 'ar' : 'en';
    const Settings = dynamic(() => import('@/components/Settings/Settings'), {ssr: false});
    
    return (
        <html lang={language} className={`${cairo.variable} ${cookie.get('theme')?.value === '1' ? 'dark' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <body className={'font-cairo dark:bg-dark'}>
                <>
                    <DetectingRoutes />
                </>
                <Header user={user} lang={language} />
                {children}
                <Settings lang={language} />
            </body>
        </html>
    )
}

