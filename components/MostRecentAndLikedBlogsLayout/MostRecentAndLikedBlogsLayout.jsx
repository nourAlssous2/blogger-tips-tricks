import { Suspense } from "react";
import SubBlogs from "../SubBlogs/SubBlogs";
import { translate } from "@/lib/funcs/translate";

const SubBlogSkeleton = () => {
    return (
        <div className="flex items-center gap-1 bg-gray-200 dark:bg-dark">
            <div className="image min-w-14 max-w-14 h-14 bg-gray-400"></div>
            <div className="flex w-full flex-col gap-1">
                <div className="w-full h-4 bg-gray-400"></div>
                <div className="h-4 bg-gray-400 w-full"></div>
            </div>
        </div>
    )
}

export default async function MostRecentAndLikedBlogsLayout({ children, lang }) {
    const translates = translate(lang);
    
    return (
        <div className="container flex gap-2 py-2">
            {children}
            <div className="border border-sky-400 h-fit w-[450px] sticky top-[64px] max-md:hidden">
                <div className="flex flex-col gap-1">
                    <b className="bg-sky-400 text-white p-1">{translates.mostRecentBlogs}:</b>
                    <div className="p-2 flex flex-col gap-2">
                        <Suspense fallback={<SubBlogSkeleton />}>
                            <SubBlogs lang={lang} url={'recent'} />
                        </Suspense>
                    </div>
                </div>
                <hr className="border-sky-400" />
                <div className="flex flex-col gap-1">
                    <b className="bg-sky-400 text-white p-1">{translates.mostLikedBlogs}:</b>
                    <div className="p-2 flex flex-col gap-2">
                        <Suspense fallback={<SubBlogSkeleton />}>
                            <SubBlogs lang={lang} url={'most-liked'} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    )
}
