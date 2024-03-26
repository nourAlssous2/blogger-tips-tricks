import BlogSkeleton from "@/components/Skeletons/Blog/BlogSkeleton"
import MostRecentAndLikedBlogsLayoutSkeleton from "@/components/Skeletons/MostRecentAndLikedBlogsLayoutSkeleton/MostRecentAndLikedBlogsLayoutSkeleton"

export default function loading() {
    return (
        <MostRecentAndLikedBlogsLayoutSkeleton>
            <div className="flex flex-col gap-2 w-full">
                <h1 className="h-6 bg-gray-400 w-28"></h1>
                <div className="grid grid-cols-2 gap-2 max-lg:grid-cols-1 max-md:grid-cols-2 max-sm:grid-cols-1">
                    <BlogSkeleton />
                </div>
            </div>
        </MostRecentAndLikedBlogsLayoutSkeleton>
    )
}
