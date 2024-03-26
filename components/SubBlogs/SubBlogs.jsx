import Image from "next/image";
import Link from "../LinkElement/LinkElement";
import { translate } from "@/lib/funcs/translate";
import dynamic from "next/dynamic";
const ConvertToLocalDate = dynamic(() => import('@/lib/funcs/date'), {ssr: false});

const SubBlog = ({ blog, lang }) => {
    return (
        <div className="flex items-center gap-1 border border-sky-400 bg-sky-200 dark:bg-dark">
            <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${blog.user.img_path}`}
                width={150}
                height={150}
                alt="Blogger Profile Image"
                className="min-w-14 max-w-14 h-14 object-cover"
            />
            <div className="text-white flex flex-col">
                <b><Link href={`/blogs/${blog.id}`} className="line-clamp-1 break-all">{blog.title}</Link></b>
                <p>
                    <ConvertToLocalDate date={blog.created_at} lang={lang}/>
                </p>
            </div>
        </div>
    )
}

export default async function SubBlogs({ url, lang }) {
    const blogs = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${url}`).then(res => res.json()).then(res => res.blogs);
    const translates = translate(lang);
    
    return (
        <>
            {blogs[0] ?
                blogs.map((blog) => <SubBlog blog={blog} lang={lang} />)
                :
                <h1 className="text-red-500">{translates.blogs404}</h1>
            }
        </>
    )
}
