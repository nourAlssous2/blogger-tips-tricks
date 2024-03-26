'use client';
import { translate } from '@/lib/funcs/translate';
import $ from 'jquery';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';

export default function Settings({ lang }) {
    const settings = useRef();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const translates = translate(lang);
    function onSubmit(e) {
        e.preventDefault();
        const formEle = $(e.target);
        const formData = new FormData(formEle[0]);
        startTransition(async () => 
            {
                await fetch(`/api/settings`, {
                    method: formEle.attr('method'),
                    body: formData,
                })
                .then(res => res)
                .then(res => {
                    const settingsObj = {
                        'theme': formData.get('theme'),
                        'lang': formData.get('lang'),
                    }
                    localStorage.setItem('settings', JSON.stringify(settingsObj))
                    router.refresh();
                })
            }
        )
    }
    useEffect(() => {
        const settingsEle = settings.current;
        $('.close-btn').on('click', function() {
            $(settingsEle).hide(0);
        });
    }, [])
    
    return (
        <div className="z-50 fixed bg-black/50 w-full h-full top-0 left-0 hidden" id='settings-page' ref={settings}>
            <div className='flex justify-center mt-1'>
                <div className='close-btn top-0 left-1/2 w-10 h-10 border text-white border-sky-400 flex justify-center items-center rounded-full cursor-pointer transition hover:text-sky-400 hover:bg-white'>
                    <i className='fa fa-close'></i>
                </div>
            </div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90%] overflow-auto bg-white dark:bg-dark p-2" id="settings">
                <form action="/api/settings" method='POST' onSubmit={onSubmit} className='dark:text-white'>
                    <div className='flex flex-col'>
                        <label htmlFor="lang-select" className='bg-sky-400 min-w-44 p-1 text-white'>{translates.language}:</label>
                        <select name="lang" id="lang-select" className='dark:bg-dark' defaultValue={JSON.parse(localStorage.getItem('settings'))?.lang}>
                            <option value="0">English</option>
                            <option value="1">العربية</option>
                        </select>
                    </div>
                    <hr className='border-sky-400' />
                    <div className='flex flex-col'>
                        <label htmlFor="theme-select" className='bg-sky-400 min-w-44 p-1 text-white'>{translates.theme}:</label>
                        <select name="theme" id="theme-select" className='dark:bg-dark' defaultValue={JSON.parse(localStorage.getItem('settings'))?.theme}>
                            <option value="0">{translates.light}</option>
                            <option value="1">{translates.dark}</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-1 mt-1'>
                        <button className='font-bold border-sky-400 border text-sky-400 transition hover:bg-sky-400 hover:text-white' disabled={isPending}>{isPending ? `${translates.saving}...` : translates.save}</button>
                        <button type='button' className='font-bold close-btn border-red-400 border text-red-400 transition hover:bg-red-400 hover:text-white'>{translates.cancel}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
