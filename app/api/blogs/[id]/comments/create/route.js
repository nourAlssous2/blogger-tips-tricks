import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function POST(request, { params }) {
    const formData = await request.formData();
    const lang = cookies().get('lang') ? cookies().get('lang').value === '1' ? 'ar' : 'en' : 'en' ;
    const blog = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${params.id}/comments/create`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${cookies().get('token').value}`,
            'Accept-Language': lang,
        },
        body: formData,
    }).then(res => {
        if (res.status === 404 || res.status === 403) {
            return false;
        }
        return res.json();
    }).then(res => res);
    revalidatePath('/blogs/[id]');
    return Response.json(blog);
}