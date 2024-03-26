export default function BlogSkeleton() {
    return (
        <div className="blog border border-gray-400 rounded-md">
            <div className="blogger flex items-center gap-1 p-1">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-500"></div>
            </div>
            <div className="image">
                <div className="h-52 bg-gray-600"></div>
            </div>
            <div className="body">
                <div className="info p-1">
                    <b><a href={'/blogs/1231'}></a></b>
                    <p className="line-clamp-2"></p>
                </div>
                <hr className="border-gray-400" />
                <div className="flex justify-between p-1">
                    <span className="bg-gray-400 p-1 rounded-md text-white flex gap-1"><span className="p-1 w-6 rounded-md bg-gray-200"></span> <i className="fa fa-thumbs-up"></i></span>
                    <span className="bg-gray-400 p-1 rounded-md text-white flex gap-1"><span className="p-1 w-6 rounded-md bg-gray-200"></span> <i className="fa fa-thumbs-down"></i></span>
                </div>
            </div>
        </div>
    )
}
