import BlogSkeleton from "@/components/Skeletons/Blog/BlogSkeleton";
import UserBlogs from "@/components/UserBlogs/UserBlogs";
import ConvertToLocalDate from "@/lib/funcs/date";
import isAuth from "@/lib/funcs/isAuth";
import { translate } from "@/lib/funcs/translate";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
    const id = params.id;
    const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile/${id}`).then(res => {
        if (res.status === 404) {
            return {
                name: 'User Not Found',
                description: 'This user does not exist'
            }
        }
        return res.json()
    }).then(res => res);

    return {
        title: data?.name,
        description: data?.description
    }
}

export default async function page({ params }) {
    const id = params.id;
    const auth = await isAuth('profile');
    const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile/${id}`).then(res => {
        if (res.status === 404) {
            return false;
        }
        return res.json()
    }).then(res => res)
    const user = data;
    if (auth) {
        if (auth.id === user.id) {
            redirect('/profile')
        }
    }
    const cookie = cookies();
    const language = cookie.get('lang')?.value === '1' ? 'ar' : 'en';
    const translates = translate(language);
    
    return (
        <div className="py-2 container flex flex-col gap-2">
            {user ?
                <>
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
                        <h2 className="text-2xl font-bold">{translates.blogsFromUser}:</h2>
                        <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2 max-sm:grid-cols-1">
                            <Suspense fallback={<BlogSkeleton />}>
                                <UserBlogs lang={language} condition={user} user={user} noBlogs={<h1 className="text-red-500 text-3xl">{translates.noBlogs.externalProfile}!</h1>} />
                            </Suspense>
                        </div>
                    </div>
                </>
                :
                <h1 className="text-red-500 text-3xl text-center">{translates.noUser}</h1>
            }
        </div>
    )
}
