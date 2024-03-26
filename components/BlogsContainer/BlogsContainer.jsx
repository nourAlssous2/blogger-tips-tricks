import { translate } from "@/lib/funcs/translate";
import Blog from "../Blog/Blog";

export default async function BlogsContainer({ url, lang }) {
    const blogs = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${url}`).then(res => res.json()).then(res => res.blogs);
    const translates = translate(lang);
    
    return (
        <>
            {blogs[0] ?
                    <div className="container grid grid-cols-3 gap-2 py-2 max-md:grid-cols-2 max-sm:grid-cols-1">
                        {
                            blogs.map((blog) => <Blog
                                blog={blog}
                                lang={lang}
                            />)
                        }
                    </div>
                :
                <h1 className="text-red-500 my-1 text-3xl text-center">{translates.blogs404}!</h1>
            }
        </>
    )
}
