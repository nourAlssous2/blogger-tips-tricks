'use client';

import { useEffect, useState } from "react";
import Blog from "../Blog/Blog";
import $ from 'jquery';

export default function ShowPaginatedBlogs({ url, lang }) {
    const [paginateData, setPaginateData] = useState();
    useEffect(() => {
        fetch(`${url}`).then(res => res.json()).then(res => {
            setPaginateData(res);
            if (!res.links.next) {
                $('#spin-loader').hide();
            }
        });
    }, [])
    
    return (
        <>
            {paginateData?.data?.blogs[0] ?
                <>
                    {paginateData?.data?.blogs?.map((blog) => <Blog lang={lang} blog={blog} />)}
                    {paginateData?.links?.next ? <ShowPaginatedBlogs url={paginateData?.links?.next} lang={lang} /> : null}
                </>
                :
                null
            }
        </>
    )
}
