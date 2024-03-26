import CategoryBlogs from "@/components/CategoryBlogs/CategoryBlogs";
import MostRecentAndLikedBlogsLayout from "@/components/MostRecentAndLikedBlogsLayout/MostRecentAndLikedBlogsLayout";
import BlogSkeleton from "@/components/Skeletons/Blog/BlogSkeleton";
import { translate } from "@/lib/funcs/translate";
import { cookies } from "next/headers";
import { Suspense } from "react";

export const dynamic = 'force-dynamic'

export function generateMetadata({ params }) {
    const { category } = params;
    const language = cookies().get('lang')?.value === '1' ? 'ar' : 'en';
    const translates = translate(language)
    const { descripeCategory } = translates.categories;
    const translatedCategory = translates.categories[category.toLowerCase()];
    const translatedText = descripeCategory(translatedCategory);
    return {
        title: translatedText,
        description: translatedText,
    }
}

export default async function page({ params: { category } }) {
    const cookie = cookies();
    const language = cookie.get('lang')?.value === '1' ? 'ar' : 'en';
    const translates = translate(language);
    
    return (
        <MostRecentAndLikedBlogsLayout>
            <div className="flex flex-col gap-2 w-full">
                <h1 className="text-3xl font-bold dark:text-white" dangerouslySetInnerHTML={{__html: translates.categories.descripeCategory(`<span class="text-sky-400">${translates.categories[category]}</span>`)}}></h1>
                <div className="grid grid-cols-2 gap-2 max-lg:grid-cols-1 max-md:grid-cols-2 max-sm:grid-cols-1">
                    <Suspense fallback={<BlogSkeleton />}>
                        <CategoryBlogs lang={language} category={category} noBlogs={<><h1 className="text-red-500 text-3xl">{translates.categoryBlogs404}</h1></>} /> 
                    </Suspense>
                </div>
            </div>
        </MostRecentAndLikedBlogsLayout>
    )
}
