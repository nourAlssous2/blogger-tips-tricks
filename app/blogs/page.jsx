import AllBlogs from "@/components/AllBlogs/AllBlogs";
import MostRecentAndLikedBlogsLayout from "@/components/MostRecentAndLikedBlogsLayout/MostRecentAndLikedBlogsLayout";
import SearchBar from "@/components/SearchBar/SearchBar";
import BlogSkeleton from "@/components/Skeletons/Blog/BlogSkeleton";
import { translate } from "@/lib/funcs/translate";
import { cookies } from "next/headers";
import { Suspense } from "react";

export function generateMetadata() {
    const language = cookies().get('lang')?.value === '1' ? 'ar' : 'en';
    const translates = translate(language)
    const { allBlogs, allBlogsPageDescription } = translates;
    return {
        title: allBlogs,
        description: allBlogsPageDescription,
    }
}

export default async function page() {
    const cookie = cookies();
    const language = cookie.get('lang')?.value === '1' ? 'ar' : 'en';
    const translates = translate(language);
    
    return (
        <div className="flex flex-col">
            <SearchBar lang={language} />
            <MostRecentAndLikedBlogsLayout lang={language}>
                <div className="flex flex-col gap-2 w-full">
                    <h1 className="text-3xl font-bold dark:text-white">{translates.allBlogs}</h1>
                    <div className="grid grid-cols-2 gap-2 max-lg:grid-cols-1 max-md:grid-cols-2 max-sm:grid-cols-1">
                        <Suspense fallback={<BlogSkeleton />}>
                            <AllBlogs lang={language} />
                        </Suspense>
                    </div>
                </div>
            </MostRecentAndLikedBlogsLayout>
        </div>
    )
}
