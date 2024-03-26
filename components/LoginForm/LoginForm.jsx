'use client'
import FormField from "@/components/FormField/FormField"
import Link from "@/components/LinkElement/LinkElement"
import { useEffect, useRef, useState } from "react"
import $ from 'jquery'
import { useRouter } from "next/navigation"
import { translate } from "@/lib/funcs/translate"


export default function LoginForm({ lang }) {
    const router = useRouter();
    const form = useRef();
    const [errors, setErrors] = useState();
    const [submitForm, setSubmitForm] = useState('submit');
    const translates = translate(lang);
    useEffect(() => {
        const formElement = form.current
        setSubmitForm('submit')
        $(formElement).on('submit', function(e) {
            e.preventDefault();
            if (submitForm === 'submit') {
                setSubmitForm('pending')
                const formData = new FormData(this);
                const [url, method] = [$(this).attr('action'), $(this).attr('method')];
                fetch(url, {
                    method: method,
                    body: formData,
                })
                .then(res => res.json())
                .then(res => {
                    if (res.token) {
                        router.replace('/');
                    } else if (res.errors) {
                        setErrors(res.errors)
                        setSubmitForm('submit')
                    }
                })
            }
        })
    }, [])
    
    return (
        <form ref={form} action={`/api/login`} method="POST" className="mb-2 flex flex-col gap-2 dark:text-white">
            <FormField id={'email'} label={translates.email} type={'email'} placeholder={translates.authFormFieldsPlaceholder(translates.email.toLowerCase())} name={'email'} errors={errors?.email} />
            <FormField id={'password'} label={translates.password} type={'password'} placeholder={translates.authFormFieldsPlaceholder(translates.password.toLowerCase())} name={'password'} errors={errors?.password} />
            <button type="submit" className={`p-1 border border-sky-400 cursor-pointer transition ${submitForm === 'pending' ? 'bg-sky-200 text-white' : null} ${submitForm === 'submit' ? 'hover:bg-sky-400 hover:text-white' : null}`} disabled={submitForm === 'pending' ? true : false}>
                {submitForm === 'pending' ? `${translates.pleaseWait}...` : translates.login}
            </button>
            <hr className="border-sky-400" />
            <p className="text-center">{translates.dontHaveAccount},<Link href={'/register'} className="underline">{translates.register} {translates.here.toLowerCase()}.</Link></p>
        </form>
    )
}
