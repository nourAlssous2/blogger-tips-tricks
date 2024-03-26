import Blog from "../Blog/Blog";

export default async function CategoryBlogs({ category, noBlogs, lang }) {
    let blogs = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/category/${category}`).then(res => res.json()).then(res => res.blogs);
    
    return (
        <>
            {
                blogs[0] ?
                blogs.map(blog => <Blog
                    blog={blog}
                    lang={lang}
                />)
                :
                noBlogs
            }
        </>
    )
}
