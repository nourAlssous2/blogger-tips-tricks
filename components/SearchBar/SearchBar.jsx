'use client';

import Link from "next/link";
import { useState } from "react";
import $ from 'jquery'
import { translate } from "@/lib/funcs/translate";

export default function SearchBar({ lang }) {
    const [results, setResults] = useState(null);
    const [searchText, setSearchText] = useState('');
    const translates = translate(lang);
    function searchResults(e) {
        const q = $(e.target).val();
        setSearchText(q);
        setResults('pending');
        if (q) {
            fetch(`/api/search?q=${q}`)
            .then(res => res.json())
            .then(res => {
                setResults(res)
            })
        } else {
            setResults(null);
        }
    }

    
    return (
        <div className="flex flex-col m-1 relative">
            <input type="text" onInput={searchResults} placeholder={`${translates.searchPlaceholder}...`} className="border-sky-400 border p-2 rounded-full mb-1 dark:bg-dark dark:text-white" />
            {results ?
                <div className="absolute top-full left-0 w-full max-h-52 overflow-auto bg-sky-400 p-1 z-40">
                    {results === 'pending' ?
                        <>{translates.searching}...</>
                        :
                        results && results?.data?.length > 0 ?
                            <div className="results-container flex flex-col gap-1">
                                {
                                    results?.data?.map((result, index) =>
                                                            <Link key={index} href={`/blogs/${result.id}`} className="border border-white p-1 transition hover:bg-white">{result.title}</Link>
                                                    )
                                }
                                {results.next_page_url ?
                                    <Link href={`/search?q=${searchText}`} className="text-center text-white underline">{translates.showAllResults}</Link> : null
                                }
                            </div>
                        :
                        <>{translates.noResults}</>
                    }
                </div>
                :
                null
            }
        </div>
    )
}
