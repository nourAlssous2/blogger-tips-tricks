'use client'
import $ from 'jquery';
import { useEffect, useRef } from 'react';
import NavBtn from '../NavBtn/NavBtn';
import Link from 'next/link';
import Image from 'next/image';
import { translate } from '@/lib/funcs/translate';

export default function Header({ user, lang }) {
    let [dropdown, burgerMenu, clickCheck, settingsBtn] = [useRef(), useRef(), true, useRef()];
    const translates = translate(lang);
    useEffect(() => {
        $(dropdown.current).slideUp(0);
        $(burgerMenu.current).on('click', function() {
            if (clickCheck) {
                clickCheck = false;
                $(dropdown.current).slideToggle(300, () => clickCheck = true);
            }
        })
        $(settingsBtn.current).on('click', function() {
            $('#settings-page').show(0);
        })
    }, [])
    
    return (
        <header className='bg-sky-400 sticky top-0 z-50'>
            <div className="container flex justify-between items-center h-14">
                <h1 className='text-2xl text-white'><Link href={'/'}>Blogger Tips Tricks <i className='fa fa-blog'></i></Link></h1>
                <div className='flex items-center gap-2'>
                    <nav className='flex gap-2 items-center max-md:hidden'>
                        <NavBtn href={'/blogs'}>{translates.allBlogs}</NavBtn>
                        {
                            user ?
                            null
                            :
                            <>
                                <NavBtn href={'/login'}>{translates.login}</NavBtn>
                                <NavBtn href={'/register'}>{translates.register}</NavBtn>
                            </>
                        }
                        {
                            user ?
                            <>
                                <Link href={'/profile'} title={user?.name} className='rounded-full overflow-hidden'>
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${user.img_path}`}
                                        width={150}
                                        height={150}
                                        alt='Profile Image'
                                        className='w-12 h-12 object-cover'
                                    />
                                </Link>
                                <NavBtn href={'/api/logout'}>{translates.logout}</NavBtn>
                                <NavBtn href={'/blogs/create'}>{translates.createBlog}</NavBtn>
                            </>
                            :
                            null
                        }
                        <button className='flex' ref={settingsBtn}>
                            <i className='border border-white p-2 rounded-full text-white transition fa fa-gear hover:bg-white hover:text-sky-400'></i>
                        </button>
                    </nav>
                    <div className="burger-menu hidden flex-col gap-1 cursor-pointer max-md:flex" ref={burgerMenu}>
                        <span className='w-8 h-1 bg-white rounded-full'></span>
                        <span className='w-8 h-1 bg-white rounded-full'></span>
                        <span className='w-8 h-1 bg-white rounded-full'></span>
                    </div>
                </div>
            </div>
            <menu className='absolute top-full left-0 w-full bg-sky-400 max-h-52 hidden overflow-auto max-md:block' ref={dropdown}>
                <nav className='container flex flex-col gap-2 p-2'>
                    <NavBtn href={'/blogs'}>{translates.allBlogs}</NavBtn>
                        {
                            user ?
                            null
                            :
                            <>
                                <NavBtn href={'/login'}>{translates.login}</NavBtn>
                                <NavBtn href={'/register'}>{translates.register}</NavBtn>
                            </>
                        }
                        {
                            user ?
                            <>
                                <Link href={'/profile'} title={user?.name} className='rounded-full overflow-hidden self-center'>
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${user.img_path}`}
                                        width={150}
                                        height={150}
                                        alt='Profile Image'
                                        className='w-12 h-12 object-cover'
                                    />
                                </Link>
                                <NavBtn href={'/api/logout'}>{translates.logout}</NavBtn>
                                <NavBtn href={'/blogs/create'}>{translates.createBlog}</NavBtn>
                            </>
                            :
                            null
                        }
                </nav>
            </menu>
        </header>
    )
}
