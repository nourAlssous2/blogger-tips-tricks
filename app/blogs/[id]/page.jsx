import Link from "@/components/LinkElement/LinkElement";
import MostRecentAndLikedBlogsLayout from "@/components/MostRecentAndLikedBlogsLayout/MostRecentAndLikedBlogsLayout";
import Image from "next/image";
import isAuth from "@/lib/funcs/isAuth";
import CommentForm from "@/components/CommentForm/CommentForm";
import BlogComments from "@/components/BlogComments/BlogComments";
import BlogCommentsSkeleton from "@/components/Skeletons/BlogComments/BlogComments";
import { Suspense } from "react";
import InteractionsBtns from "@/components/InteractionsBtns/InteractionsBtns";
import { cookies } from "next/headers";
import { translate } from "@/lib/funcs/translate";
import dynamicImport from "next/dynamic";
const ConvertToLocalDate = dynamicImport(() => import('@/lib/funcs/date'), {ssr: false});

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
    const { id } = params;
    const token = cookies().get('token')?.value;
    const blog = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(res => {
        if (res.status === 404) {
            return false;
        }
        return res.json()
    }).then(res => res);
    return {
        title: blog?.title,
        description: blog?.body,
    }
}

export default async function page({ params }) {
    const { id } = params;
    const token = cookies().get('token')?.value;
    const blog = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(res => {
        if (res.status === 404) {
            return false;
        }
        return res.json()
    }).then(res => res);
    let [blogger, thisUser] = [null, null];
    if (blog) {
        blogger = blog.user;
        thisUser = await isAuth('profile').then(res => res);
    }
    const cookie = cookies();
    const language = cookie.get('lang')?.value === '1' ? 'ar' : 'en';
    const translates = translate(language);
    
    return (
        <MostRecentAndLikedBlogsLayout lang={language}>
            <>
                {blog ?
                    <div className="flex flex-col dark:text-white">
                        <div className="blog border border-sky-400 rounded-md w-full">
                            <div className="flex justify-between items-center p-1">
                                <div className="blogger flex items-center gap-1">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${blog.user.img_path}`}
                                        width={100}
                                        height={100}
                                        alt="Blogger Profile Image"
                                        className="w-14 h-14 rounded-full overflow-hidden object-cover"
                                    />
                                    <div className="flex flex-col">
                                        <b><Link href={`/profile/${blog.user.id}`}>{blog.user.name}</Link></b>
                                        <p>
                                            <ConvertToLocalDate date={blog.created_at} lang={language} />
                                        </p>
                                    </div>
                                </div>
                                {blogger.id === thisUser.id ?
                                    <div className="relative group/edit-blog">
                                        <div className="flex items-center justify-center w-10 h-10 cursor-pointer rounded-full transition group-hover/edit-blog:bg-sky-400 group-hover/edit-blog:text-white">
                                            <i className="fa fa-ellipsis-v"></i>
                                        </div>
                                        <div className="border border-sky-400 rounded-md flex flex-col opacity-0 overflow-hidden absolute top-full -z-30 transition-opacity bg-white dark:bg-dark group-hover/edit-blog:opacity-100 group-hover/edit-blog:z-30 peer-hover/edit-blog:">
                                            <Link href={`/api/blogs/delete/${blog.id}`} className={'hover:bg-red-400 p-2 hover:text-white'}>{translates.delete}</Link>
                                            <Link href={`/blogs/update/${blog.id}`} className={'hover:bg-sky-400 p-2 hover:text-white'}>{translates.update}</Link>
                                        </div>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                            <div className="image relative">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${blog.img_path}`}
                                    width={1920}
                                    height={1080}
                                    alt="Blog Image"
                                    className="w-full object-cover h-[700px] max-xl:h-[600px] max-lg:h-[500px] max-md:h-[400px] max-sm:h-[300px]"
                                />
                                <div className="absolute top-1 right-1 bg-sky-400 text-white p-1 capitalize">
                                    {translates.categories[blog.category]}
                                </div>
                            </div>
                            <div className="body">
                                <div className="info p-1">
                                    <b>{blog.title}</b>
                                    <p className="line-clamp-2">{blog.body}</p>
                                </div>
                                <hr className="border-sky-400" />
                                <div className="flex justify-between p-1">
                                    <InteractionsBtns blog={blog} user={thisUser} token={token} />
                                </div>
                            </div>
                        </div>
                        {thisUser ?
                            <CommentForm lang={language} blogId={blog.id} />
                            :
                            null
                        }
                        <h1 className="text-3xl font-bold mt-5">{translates.blogComments}:</h1>
                        <Suspense fallback={<BlogCommentsSkeleton />}>
                            <BlogComments lang={language} blogId={blog.id} />
                        </Suspense>
                    </div>
                    :
                    <h1 className="text-red-500 text-3xl">{translates.blog404}</h1>
                }
            </>
        </MostRecentAndLikedBlogsLayout>
    )
}
