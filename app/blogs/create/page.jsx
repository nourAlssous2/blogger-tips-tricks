import BlogForm from "@/components/BlogForm/BlogForm";
import isAuth from "@/lib/funcs/isAuth";
import { translate } from "@/lib/funcs/translate";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function generateMetadata() {
    const language = cookies().get('lang')?.value === '1' ? 'ar' : 'en';
    const translates = translate(language)
    const { createBlog, createBlogPageDescription } = translates;
    return {
        title: createBlog,
        description: createBlogPageDescription,
    }
}

export default async function page() {
    const data = await isAuth('profile').then(res => res);
    if (!data) {
        redirect('/login');
    }
    const cookie = cookies();
    const language = cookie.get('lang')?.value === '1' ? 'ar' : 'en';
    const translates = translate(language);
    
    return (
        <div className="container">
            <h1 className="text-center my-2 text-3xl font-bold dark:text-white">{translates.createBlog}</h1>
            <BlogForm action={'create'} submitBtnText={'Create'} loadingText={'Creating please wait...'} lang={language} />
        </div>
    )
}