import React from 'react'

export default function loading() {
    return (
        <div className='container'>
            <h1 className='w-32 h-6 bg-gray-400 my-2'></h1>
            <div className='mb-2 flex flex-col gap-2'>
                <div className="flex flex-col gap-1">
                    <div className="h-6 w-28 bg-gray-400"></div>
                    <div className="h-10 bg-gray-400"></div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="h-6 w-28 bg-gray-400"></div>
                    <div className="h-10 bg-gray-400"></div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="h-6 w-28 bg-gray-400"></div>
                    <div className="h-10 bg-gray-400"></div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="h-6 w-28 bg-gray-400"></div>
                    <div className="h-40 bg-gray-400"></div>
                </div>
                <div className="h-10 bg-gray-400"></div>
            </div>
        </div>
    )
}
