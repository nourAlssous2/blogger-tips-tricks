import { redirect } from "next/navigation";
import isAuth from "@/lib/funcs/isAuth";

export const dynamic = 'force-dynamic'

export default async function layout({ children }) {
    const data = await isAuth('profile').then(res => res);
    if (data) {
        redirect('/');
    }
    
    return (
        <>
            {children}
        </>
    )
}
