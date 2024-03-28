'use client';

import { useEffect, useState, useTransition } from "react";
import Blog from "./Blog/Blog";

export default function Recursuive({ url }) {
    const [blogs, setBlogs] = useState();
    const [isPending, startTransition] = useTransition();
    useEffect(() => {
        startTransition(async () => {
            await fetch(url || `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs?page=${1}`).then(res => res.json()).then(res => {
                console.log(res);
                setBlogs(res);
            });
        })
    }, [])
    
    return (
        <>
        <div className="text-white">
            {blogs?.links?.next ?
                <>
                {
                    blogs.data.blogs.map((blog, i) => {
                        return (
                            <>
                                <Blog blog={blog} lang={'ar'} key={i} />
                            </>
                        )
                    })
                }
                <Recursuive url={blogs.links.next} />
                </>
                :
                null
            }
        </div>
        </>
    )
}
