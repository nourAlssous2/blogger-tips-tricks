import { translate } from "@/lib/funcs/translate";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
const ConvertToLocalDate = dynamic(() => import('@/lib/funcs/date'), {ssr: false});

export default function Blog({ blog, lang, translatesObj }) {
    let translates = null;
    if (translatesObj) {
        translates = translatesObj;
    } else {
        translates = translate(lang);
    }
    
    return (
        <div className="blog border border-sky-400 rounded-md">
            <div className="blogger flex items-center gap-1 p-1">
                <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${blog.user.img_path}`}
                    width={100}
                    height={100}
                    alt="Blogger Profile Image"
                    className="w-14 h-14 rounded-full overflow-hidden object-cover"
                />
                <div className="flex flex-col">
                    <b className="dark:text-white"><Link href={`/profile/${blog.user.id}`}>{blog.user.name}</Link></b>
                    <p className="dark:text-white">
                        {
                            <ConvertToLocalDate lang={lang} date={blog.created_at} />
                        }
                    </p>
                </div>
            </div>
            <div className="image relative">
                <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${blog.img_path}`}
                    width={500}
                    height={400}
                    alt="Blog Image"
                    className="w-full object-cover h-72"
                />
                <div className="absolute top-1 right-1 bg-sky-400 text-white p-1 capitalize">
                    {translates.categories[blog.category]}
                </div>
            </div>
            <div className="body">
                <div className="info p-1 dark:text-white">
                    <b><Link href={`/blogs/${blog.id}`}>{blog.title}</Link></b>
                    <p className="line-clamp-2">{blog.body}</p>
                </div>
                <hr className="border-sky-400" />
                <div className="flex justify-between p-1">
                    <span className="bg-sky-400 p-1 rounded-md text-white">{blog.interactions.likes} <i className="fa fa-thumbs-up"></i></span>
                    <span className="bg-sky-400 p-1 rounded-md text-white">{blog.interactions.dislikes} <i className="fa fa-thumbs-down"></i></span>
                </div>
            </div>
        </div>
    )
}
