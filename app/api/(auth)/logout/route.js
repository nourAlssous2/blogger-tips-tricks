import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
    if (request.cookies.has('token')) {
        const token = cookies().get('token')?.value;
        cookies().delete('token')
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/logout`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    return NextResponse.redirect('http://localhost:3000/');
}