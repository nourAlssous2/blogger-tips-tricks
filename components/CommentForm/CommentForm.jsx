'use client';

import { useEffect, useRef, useState, useTransition } from "react";
import $ from 'jquery';
import { useRouter } from "next/navigation";
import ValidationError from "../ValidationError/ValidationError";
import { translate } from "@/lib/funcs/translate";

export default function CommentForm({ blogId, lang }) {
    const form = useRef();
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [isPending, startTransition] = useTransition()
    const translates = translate(lang);
    useEffect(() => {
        const formElement = form.current;
        $(formElement).on('submit', async function(e) {
            const formData = new FormData(formElement);
            e.preventDefault();
            startTransition(async () => {
                await fetch($(formElement).attr('action'), {
                    method: $(formElement).attr('method'),
                    body: formData,
                })
                .then(res => res.json())
                .then(res => {
                    if (res.errors) {
                        setErrors(res.errors);
                    }
                })
                .catch((err) => console.log(err))
                .finally(async () => {
                    router.refresh()
                })
            })
        })
    }, [])
    
    return (
        <form ref={form} action={`/api/blogs/${blogId}/comments/create`} method="POST" className="flex flex-col my-1 dark:text-white">
            <label htmlFor="body" className="text-2xl font-bold">{translates.create} {translates.comment}:</label>
            <textarea name="body" required id="body" className="outline-none border border-sky-400 p-1 h-32 dark:bg-dark" placeholder={translates.authFormFieldsPlaceholder(translates.comment.toLowerCase())}></textarea>
            <ValidationError errors={errors?.body} />
            <input type="submit" value={!isPending ? translates.create : `${translates.creating}, ${translates.pleaseWait.toLowerCase()}...`} disabled={isPending} className="border border-sky-400 transition mt-1 cursor-pointer hover:bg-sky-400 hover:text-white" />
        </form>
    )
}
