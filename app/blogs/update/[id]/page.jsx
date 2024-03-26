import BlogForm from "@/components/BlogForm/BlogForm";
import isAuth from "@/lib/funcs/isAuth";
import { translate } from "@/lib/funcs/translate";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getBlog(id) {
    return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${id}`).then(res => {
        if (res.status === 404) {
            return false;
        }
        return res.json();
    }).then(res => res);
}

export async function generateMetadata({ params }) {
    const language = cookies().get('lang')?.value === '1' ? 'ar' : 'en';
    const translates = translate(language);
    const blog = await getBlog(params.id);
    return {
        title: blog ? `${translates.update} ${blog.title}` : translates.blog404,
        description: blog ? `${translates.updateBlogPageDescription}: ${blog.title}` : translates.blog404,
    }
}

export default async function page({ params }) {
    const data = await isAuth('profile').then(res => res);
    if (!data) {
        redirect('/login');
    }
    const blog = await getBlog(params.id);
    const cookie = cookies();
    const language = cookie.get('lang')?.value === '1' ? 'ar' : 'en';
    const translates = translate(language);
    
    return (
        <div className="container">
            <h1 className="text-center my-2 text-3xl font-bold dark:text-white">{translates.editBlog}</h1>
            {blog ?
                blog.user.id === data.id ?
                    <BlogForm action={`update/${blog.id}`} blog={blog} submitBtnText={'Update'} loadingText={'Updating please wait...'} lang={language} />
                    :
                    <h1 className="text-3xl text-red-500">{translates.action403}</h1>
                :
                <h1 className="text-3xl text-red-500">{translates.blog404}</h1>
            }
        </div>
    )
}
