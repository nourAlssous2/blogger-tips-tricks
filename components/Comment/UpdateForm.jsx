'use client'
import { useState, useTransition } from 'react'
import ValidationError from '../ValidationError/ValidationError'
import { useRouter } from 'next/navigation';
import $ from 'jquery'

export default function UpdateForm({ comment, refrence }) {
    const [isPending, startTransition] = useTransition();
    const [errors, setErrors] = useState()
    const router = useRouter();
    function updateComment(e) {
        e.preventDefault();
        const form = e.target
        const formData = new FormData(form);
        startTransition(async () => {
            await fetch(`/api/blogs/${comment.blog.id}/comments/${comment.id}/update`, {
                method: $(form).attr('method'),
                body: formData
            })
            .then(res => res.json())
            .then(res => {
                if (res.errors) {
                    setErrors(res.errors)
                }
            })
            .finally(() => router.refresh());
        })
    }
    
    return (
        <div ref={refrence} className='hidden'>
            <form onSubmit={updateComment} action={`/api/blogs/${comment.blog.id}/comments/${comment.id}/update`} method="POST" className="flex flex-col my-1">
                <textarea name="body" required id="body" className="outline-none p-1 h-32 dark:bg-gray-800" placeholder="Type your comment" defaultValue={comment.body}></textarea>
                <ValidationError errors={errors?.body} />
                <input type="submit" disabled={isPending} value={isPending ? 'Updating, please wait...' : 'Update'} className="border border-sky-400 transition mt-1 cursor-pointer hover:bg-sky-400 hover:text-white" />
            </form>
        </div>
    )
}
