import isAuth from "@/lib/middlewares/isAuth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function GET(request, { params }) {
    const { id } = params;
    if (request.cookies.has('token')) {
        const auth = await isAuth('profile').then(res => res);
        if (auth) {
            const token = cookies().get('token').value;
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/delete/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }
    }
    return redirect('/blogs');
}