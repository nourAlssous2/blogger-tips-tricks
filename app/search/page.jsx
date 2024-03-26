import Blog from "@/components/Blog/Blog";
import { translate } from "@/lib/funcs/translate";
import { cookies } from "next/headers";

export function generateMetadata({ searchParams }) {
    const { q } = searchParams;
    const language = cookies().get('lang')?.value === '1' ? 'ar' : 'en';
    const translates = translate(language)
    const { searchPageDescription, searchResults } = translates;
    return {
        title: searchResults(q),
        description: searchPageDescription,
    }
}

export default async function page({ searchParams }) {
    const { q } = searchParams;
    let blogs = [];
    if (q) {
        blogs = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/search-results?q=${q}`).then(res => res.json()).then(res => res.data.blogs)
    }
    const cookie = cookies();
    const language = cookie.get('lang')?.value === '1' ? 'ar' : 'en';
    const translates = translate(language);
    
    return (
        <>
            {blogs[0] ?
                <div className="flex flex-col">
                    <h1 className="text-center text-3xl font-bold my-5">{translates.searchResults(q)}</h1>
                    <div className="container grid grid-cols-3 gap-2 py-2 max-md:grid-cols-2 max-sm:grid-cols-1">
                        {
                            blogs.map((blog) => <Blog
                                blog={blog}
                                lang={language}
                            />)
                        }
                    </div>
                </div>
                :
                <h1 className="text-red-500 my-1 text-3xl text-center">{translates.noResults}!</h1>
            }
        </>
    )
}