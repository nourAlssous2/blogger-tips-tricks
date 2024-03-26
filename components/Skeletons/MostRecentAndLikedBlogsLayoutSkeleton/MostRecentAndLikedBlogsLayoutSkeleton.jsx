const SubBlog = () => {
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

export default function MostRecentAndLikedBlogsLayoutSkeleton({ children }) {
    return (
        <div className="container flex gap-2 py-2">
            {children}
            <div className="border border-gray-400 h-fit w-[450px] sticky top-[64px] max-md:hidden">
                <div className="p-2 flex flex-col gap-1">
                    <b className="bg-gray-400 text-white h-6"></b>
                    <div className="flex flex-col gap-2">
                        <SubBlog />
                    </div>
                </div>
                <div className="p-2 flex flex-col gap-1">
                    <b className="bg-gray-400 text-white h-6"></b>
                    <div className="flex flex-col gap-2">
                        <SubBlog />
                    </div>
                </div>
            </div>
        </div>
    )
}
