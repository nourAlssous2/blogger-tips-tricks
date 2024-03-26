import isAuth from "@/lib/funcs/isAuth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
    const auth = await isAuth('profile').then(res => res);
    const lang = cookies().get('lang') ? cookies().get('lang').value === '1' ? 'ar' : 'en' : 'en' ;
    if (!auth) {
        const formData = await request.formData();
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
            method: "POST",
            body: formData,
            headers: {
                'Accept-Language': lang
            }
        }).then(res => res.json()).then(res => res);
        if (response.token) {
            cookies().set('token', response.token);
        }
        return NextResponse.json(response);
    }
    const { origin } = request.nextUrl;
    return NextResponse.redirect(`${origin}/`)
}