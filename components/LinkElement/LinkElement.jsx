'use client'

import { useRouter } from "next/navigation";

export default function Link({ href, eventHandler, children, className }) {
    const router = useRouter();
    function callback(e) {
        e.preventDefault();
        router.push(href);
        router.refresh();
        if (eventHandler) {
            eventHandler();
        }
    }
    
    return (
        <a href={href} className={className} onClick={callback}>{children}</a>
    )
}
