import React from 'react'
import Blog from '../Blog/Blog';

export default async function UserBlogs({ condition, user, noBlogs, lang }) {
    let blogs;
    if (condition) {
        blogs = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/user/${user.id}`).then(res => res.json()).then(res => res.blogs);
    }
    
    return (
        blogs[0] ?
            blogs.map((blog) => <Blog
                blog={blog}
                lang={lang}
            />)
            :
            noBlogs
    )
}
