'use client'

import { useEffect, useRef, useState } from "react"
import FormField from "../FormField/FormField"
import ValidationError from "../ValidationError/ValidationError"
import { useRouter } from "next/navigation";
import $ from 'jquery'
import { translate } from "@/lib/funcs/translate";

export default function CreateBlogForm({ action, blog, submitBtnText, loadingText, lang }) {
    const router = useRouter();
    const [form, imagePreview, fileInput] = [useRef(), useRef(), useRef()];
    const [uploadProgress, setuploadProgress] = useState();
    const [errors, setErrors] = useState();
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
                    if (res.blog) {
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
        <form action={`/api/blogs/${action}`} ref={form} method="POST" encType="multipart/form-data" className="mb-2 flex flex-col gap-2 dark:text-white">
            <FormField id={'title'} label={translates.title} type={'text'} placeholder={translates.blogFormFieldsPlaceholder(translates.title.toLowerCase())} name={'title'} errors={errors?.title} defaultValue={blog?.title} />
            <div className="flex flex-col">
                <label htmlFor='body'>{translates.body}:</label>
                <textarea name="body" id="body" placeholder={translates.blogFormFieldsPlaceholder(translates.body.toLowerCase())} className="outline-none border border-sky-400 p-1 h-32 dark:bg-dark" defaultValue={blog?.body}></textarea>
                <ValidationError errors={errors?.body} />
            </div>
            <div className="flex flex-col">
                <label htmlFor='category'>{translates.category}:</label>
                <select name="category" id="category" className="border border-sky-400 dark:bg-dark" defaultValue={blog?.category}>
                    <option value={'sport'}>{translates.categories.sport}</option>
                    <option value={'anime'}>{translates.categories.anime}</option>
                    <option value={'personal'}>{translates.categories.personal}</option>
                    <option value={'health'}>{translates.categories.health}</option>
                    <option value={'learn'}>{translates.categories.learn}</option>
                    <option value={'history'}>{translates.categories.history}</option>
                    <option value={'technology'}>{translates.categories.technology}</option>
                </select>
                <ValidationError errors={errors?.category} />
            </div>
            <div className="flex flex-col">
                <label htmlFor='image'>{translates.blogImg}:</label>
                <div className="border border-sky-400 flex flex-col">
                    <input type={'file'} id={'file'} name={'image'} className="outline-none p-1 hidden" ref={fileInput} />
                    <label htmlFor={'file'} className="file-upload-btn bg-sky-400 w-full h-14 text-white flex items-center justify-center text-xl gap-1 cursor-pointer transition hover:bg-sky-200">
                        {translates.chooseImg} <i className="fa fa-cloud-upload"></i>
                    </label>
                    <hr className="border-sky-400" />
                    <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${blog?.img_path ? blog?.img_path : 'default_blog.webp'}`}
                        className="w-full h-[1080px] self-center object-cover max-xl:h-[700px] max-lg:h-[600px] max-md:h-[500px] max-sm:h-[400px]"
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
                {submitForm === 'pending' ? loadingText : submitBtnText}
            </button>
        </form>
    )
}
