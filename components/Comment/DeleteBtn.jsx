'use client'

import { useTransition } from "react"
import { useRouter } from "next/navigation";
import { translate } from "@/lib/funcs/translate";

export default function DeleteBtn({ commentId, lang }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter();
    const translates = translate(lang);
    function deleteComment() {
        if (!isPending) {
            startTransition(async () => {
                await fetch(`/api/comments/delete/${commentId}`, {
                    method: 'POST'
                }).finally(() => router.refresh());
            })
        }
    }
    
    return (
        <button onClick={deleteComment} disabled={isPending} className={'hover:bg-red-400 p-2 hover:text-white'}>{isPending ? `${translates.deleting}...` : translates.delete}</button>
    )
}
