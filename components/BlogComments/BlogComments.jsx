import isAuth from "@/lib/funcs/isAuth";
import Comment from "../Comment/Comment";
import { translate } from "@/lib/funcs/translate";

export default async function BlogComments({ blogId, lang }) {
    const auth = await isAuth('profile').then(res => res);
    const comments = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${blogId}/comments`).then(res => {
        if (res.status === 404) {
            return false
        }
        return res.json();
    }).then(res => res.comments);
    const translates = translate(lang);
    
    return (
        <>
            <div className="flex flex-col gap-1">
                {comments[0] ?
                    comments.map(comment => <Comment lang={lang} comment={comment} authorize={auth ? auth.id === comment.user.id ? true : false : false} />)
                    :
                    <h1 className="text-3xl text-red-500">{translates.comments404}</h1>
                }
            </div>
        </>
    )
}
