export default function loading() {
    return (
        <div className="container">
            <h1 className="my-2 h-6 bg-gray-400 w-28 mx-auto"></h1>
            <div className="mb-2 flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <div className="h-6 w-28 bg-gray-400"></div>
                    <div className="h-10 bg-gray-400"></div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="h-6 w-28 bg-gray-400"></div>
                    <div className="h-10 bg-gray-400"></div>
                </div>
                <div className="h-10 bg-gray-400"></div>
                <hr className="border-gray-400" />
                <div className="my-2 h-6 bg-gray-400 w-40 mx-auto"></div>
            </div>
        </div>
    )
}
