import { cookies } from "next/headers";

export async function POST(request) {
    const formData = await request.formData();
    cookies().set('theme', formData.get('theme'));
    cookies().set('lang', formData.get('lang'));
    return Response.json('success');
}