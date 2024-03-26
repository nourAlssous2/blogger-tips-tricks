import { cookies } from "next/headers";

export default async function isAuth(route) {
    const cookie = cookies().get('token');
    if (!cookie) {
        return false
    } else if (cookie) {
        const token = cookie.value;
        const repsonse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${route}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        .then(res => {
            if (res.status === 404 || res.status === 403) {
                return false;
            } else {
                const user = res.json();
                return (
                    user
                )
            }
        })
        .then(res => res);
        return repsonse;
    }
}