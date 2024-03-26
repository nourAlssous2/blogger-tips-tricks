import { cookies } from "next/headers";

export async function POST(request, { params }) {
    const id = params.id;
    const lang = cookies().get('lang') ? cookies().get('lang').value === '1' ? 'ar' : 'en' : 'en' ;
    let blog = {};
    if (request.cookies.has('token')) {
        const token = cookies().get('token').value;
        const formData = await request.formData();
        blog = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/update/${id}`, {
            method: "POST",
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept-Language': lang,
            }
        }).then(res => {
            if (res.status === 404 || res.status === 403) {
                return false;
            }
            return res.json()
        }).then(res => res);
    }
    return Response.json(blog);
}