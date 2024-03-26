import BlogSkeleton from "@/components/Skeletons/Blog/BlogSkeleton"

export default function loading() {
    return (
        <div className="py-2 container flex flex-col gap-2">
            <div className="flex flex-col mx-auto w-fit items-center">
                <div className="w-28 h-28 bg-gray-400 rounded-full"></div>
                <div className="w-full bg-gray-400 h-6 mt-1"></div>
            </div>
            <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2 max-sm:grid-cols-1">
                <div className="p-4 bg-gray-200"></div>
                <div className="p-4 bg-gray-200"></div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="w-28 bg-gray-400 h-6"></div>
                <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2 max-sm:grid-cols-1">
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    )
}