import { translate } from "@/lib/funcs/translate";
import Blog from "../Blog/Blog"
import ShowPaginatedBlogs from "../ShowPaginatedBlogs/ShowPaginatedBlogs";

export default async function AllBlogs({ lang }) {
    const blogs = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`).then(res => res.json()).then(res => res);
    const translates = translate(lang);
    return (
        <>
            {blogs.data.blogs[0] ?
                <>
                    {blogs.data.blogs.map((blog) => 
                            <Blog
                                blog={blog}
                                lang={lang}
                            />
                        )
                    }
                    {blogs.links.next ? 
                        <>
                            <ShowPaginatedBlogs url={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs?page=2`} lang={lang} />
                            <div className="animate-spin w-10 h-10 rounded-full border border-l-transparent border-sky-400" id="spin-loader"></div>
                        </>
                        :
                        null
                    }
                </>
                :
                <h1 className="text-red-500 text-2xl">{translates.blogs404}!</h1>
            }
        </>
    )
}
