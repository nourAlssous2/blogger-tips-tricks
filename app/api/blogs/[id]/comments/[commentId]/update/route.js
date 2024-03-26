export async function POST(request, { params }) {
    let updatedComment = {};
    const lang = cookies().get('lang') ? cookies().get('lang').value === '1' ? 'ar' : 'en' : 'en' ;
    if (request.cookies.has('token')) {
        const formData = await request.formData();
        const { id, commentId } = params;
        const token = request.cookies.get('token').value
        const fetchRequest = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${id}/comments/${commentId}/update`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept-Language': lang,
            }
        })
        .then(res => res);
        if (fetchRequest.ok) {
            updatedComment = await fetchRequest.json()
        }
    }
    return Response.json(updatedComment);
}