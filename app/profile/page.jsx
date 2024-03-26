import BlogSkeleton from "@/components/Skeletons/Blog/BlogSkeleton";
import UserBlogs from "@/components/UserBlogs/UserBlogs";
import isAuth from "@/lib/funcs/isAuth";
import { translate } from "@/lib/funcs/translate";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation"
import { Suspense } from "react";
const ConvertToLocalDate = dynamic(() => import('@/lib/funcs/date'), {ssr: false});

export async function generateMetadata() {
    const data = await isAuth('profile').then(res => res)
    return {
        title: data?.name,
        description: data?.description
    }
}

export default async function page() {
    const data = await isAuth('profile').then(res => res)
    if (!data) {
        redirect('/login');
    };
    const cookie = cookies();
    const language = cookie.get('lang')?.value === '1' ? 'ar' : 'en';
    const translates = translate(language);

    const user = data;
    let blogs = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/user/${user.id}`).then(res => res.json()).then(res => res.blogs);
    
    return (
        <div className="py-2 container flex flex-col gap-2">
            <div className="flex flex-col mx-auto w-fit items-center">
                <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${user?.img_path}`}
                    width={250}
                    height={250}
                    alt="Porfile Image"
                    className="w-28 h-28 object-cover rounded-full"
                />
                <h2 className="text-2xl font-bold">{user?.name}</h2>
            </div>
            <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2 max-sm:grid-cols-1">
                <p className="bg-sky-200 p-4 text-xl"><b>{translates.createdAt}:</b> <ConvertToLocalDate lang={language} date={user?.created_at} /></p>
                <p className="bg-sky-200 p-4 text-xl break-all"><b>{translates.description}:</b> {user?.description}</p>
            </div>
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold">{translates.yourBlogs}:</h2>
                <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2 max-sm:grid-cols-1">
                    <Suspense fallback={<BlogSkeleton />}>
                        <UserBlogs lang={language} condition={true} user={user} noBlogs={<h1 className="text-3xl text-red-500">{translates.noBlogs.currnetProfile}!</h1>} />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
