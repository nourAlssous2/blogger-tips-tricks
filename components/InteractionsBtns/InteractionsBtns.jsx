'use client'

import { useRef, useState } from "react"

export default function InteractionsBtns({ blog, user, token }) {
    const [interactionType, setInteractionType] = useState(blog.has);
    const [likeBtn, disLikeBtn] = [useRef(), useRef()];
    function interact(type) {
        const [likeBtnEle, disLikeBtnEle] = [likeBtn.current, disLikeBtn.current];
        if (type !== interactionType) {
            if (type === '0') {
                const disLikesNumber = +disLikeBtnEle.innerText;
                disLikeBtnEle.innerText = 1 + disLikesNumber;
                if (interactionType) {
                    likeBtnEle.innerText -= 1;
                }
            } else if (type === '1') {
                const likesNumber = +likeBtnEle.innerText;
                likeBtnEle.innerText = 1 + likesNumber;
                if (interactionType) {
                    disLikeBtnEle.innerText -= 1;
                }
            }
            setInteractionType(type)
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${type === '1' ? 'like' : 'dislike'}/${blog.id}?type=1`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        } else {
            setInteractionType(false)
            if (type === '0') {
                disLikeBtnEle.innerText -= 1
            } else if (type === '1') {
                likeBtnEle.innerText -= 1
            }
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${type === '1' ? 'like' : 'dislike'}/${blog.id}?type=0`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        };
    }
    
    return (
        <>
            <span onClick={(e) => user ? interact('1') : false} className={`p-1 rounded-md text-sky-400 border border-sky-400 ${user ? 'cursor-pointer hover:bg-sky-400 hover:text-white': null} ${interactionType === '1' ? 'bg-sky-400 text-white' : null}`}><span ref={likeBtn}>{blog.interactions.likes}</span> <i className="fa fa-thumbs-up"></i></span>
            <span onClick={(e) => user ? interact('0') : false} className={`p-1 rounded-md text-sky-400 border border-sky-400 ${user ? 'cursor-pointer hover:bg-sky-400 hover:text-white': null} ${interactionType === '0' ? 'bg-sky-400 text-white' : null}`}><span ref={disLikeBtn}>{blog.interactions.dislikes}</span> <i className="fa fa-thumbs-down"></i></span>
        </>
    )
}
