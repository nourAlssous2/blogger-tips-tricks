'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import $ from 'jquery'
import { useRouter } from "next/navigation";
import ValidationError from "../ValidationError/ValidationError";
import FormField from "../FormField/FormField";
import { translate } from "@/lib/funcs/translate";

export default function Form({ lang }) {
    const router = useRouter();
    const [form, imagePreview, fileInput] = [useRef(), useRef(), useRef()];
    const [errors, setErrors] = useState();
    const [uploadProgress, setuploadProgress] = useState();
    const [submitForm, setSubmitForm] = useState('submit');
    const translates = translate(lang);
    useEffect(() => {
        let xml = new XMLHttpRequest();
        const formElement = form.current
        const fileInputElement = fileInput.current;
        const imagePreviewElement = imagePreview.current;
        setSubmitForm('submit');
        $(formElement).on('submit', function(e) {
            e.preventDefault();
            if (submitForm === 'submit') {
                setSubmitForm('pending');
                const formData = new FormData(this);
                const [url, method] = [$(this).attr('action'), $(this).attr('method')];
                xml.open(method, url);
                xml.upload.addEventListener('progress', function({total, loaded}) {
                    if (fileInputElement.files[0]) {
                        const loadPercent = Math.trunc((loaded / total) * 100);
                        setuploadProgress(loadPercent);
                    }
                })
                xml.onload = function() {
                    const res = JSON.parse(xml.response);
                    if (res.token) {
                        router.replace('/')
                    } else if (res.errors) {
                        setErrors(res.errors)
                        setuploadProgress(null)
                        setSubmitForm('submit');
                    }
                }
                xml.send(formData);
            }
        })
        $(fileInputElement).on('change', function(e) {
            const [file] = e.target.files
            const url = URL.createObjectURL(file)
            $(imagePreviewElement).attr('src', url);
        })
    }, [])
    
    return (
        <form ref={form} action="/api/register" method="POST" className="mb-2 flex flex-col gap-2 dark:text-white" encType="multipart/form-data">
            <FormField id={'name'} label={translates.name} type={'text'} placeholder={`${translates.authFormFieldsPlaceholder(translates.name.toLowerCase())}...`} name={'name'} errors={errors?.name} />
            <FormField id={'email'} label={translates.email} type={'email'} placeholder={`${translates.authFormFieldsPlaceholder(translates.email.toLowerCase())}...`} name={'email'} errors={errors?.email} />
            <FormField id={'password'} label={translates.password} type={'password'} placeholder={`${translates.authFormFieldsPlaceholder(translates.password.toLowerCase())}...`} name={'password'} errors={errors?.password} />
            <FormField id={'password_confirmation'} label={translates.passwordConfirmLabel} type={'password'} placeholder={`${translates.passwordConfirmPlaceholder}...`} name={'password_confirmation'} />
            <div className="flex flex-col">
                <label>{translates.profileImg}:</label>
                <div className="border border-sky-400 flex flex-col">
                    <input type={'file'} id={'file'} name={'image'} className="outline-none p-1 hidden" ref={fileInput} />
                    <label htmlFor={'file'} className="file-upload-btn bg-sky-400 w-full h-14 text-white flex items-center justify-center text-xl gap-1 cursor-pointer transition hover:bg-sky-200">
                        {translates.chooseImg} <i className="fa fa-cloud-upload"></i>
                    </label>
                    <hr className="border-sky-400" />
                    <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/default.png`}
                        className="rounded-full w-14 h-14 my-1 self-center object-cover"
                        ref={imagePreview}
                        alt="profile image preview"
                    />
                    {uploadProgress ?
                        <div className="bg-gray-400 h-10">
                            <div className="h-full bg-sky-400 flex items-center justify-center transition-all text-white" style={{width: `${uploadProgress}%`}}>
                                {uploadProgress}%
                            </div>
                        </div>
                        :
                        null
                    }
                    <ValidationError errors={errors?.image} />
                </div>
            </div>
            <button type="submit" className={`p-1 border border-sky-400 cursor-pointer transition ${submitForm === 'pending' ? 'bg-sky-200 text-white' : null} ${submitForm === 'submit' ? 'hover:bg-sky-400 hover:text-white' : null}`} disabled={submitForm === 'pending' ? true : false}>
                {submitForm === 'pending' ? `${translates.pleaseWait}...` : translates.register}
            </button>
            <hr className="border-sky-400" />
            <p className="text-center">{translates.haveAccount},<Link href={'/login'} className="underline">{translates.login} {translates.here}.</Link></p>
        </form>
    )
}
