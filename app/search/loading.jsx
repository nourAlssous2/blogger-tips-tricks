import BlogSkeleton from "@/components/Skeletons/Blog/BlogSkeleton"

export default function loading() {
    return (
        <div className="container grid grid-cols-3 gap-2 py-2 max-md:grid-cols-2 max-sm:grid-cols-1">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
        </div>
    )
}
