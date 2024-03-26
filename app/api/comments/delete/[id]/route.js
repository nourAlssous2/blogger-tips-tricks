export async function POST(request, { params }) {
    const { id } = params;
    let statusCode = 404;
    if (request.cookies.has('token')) {
        const token = request.cookies.get('token').value;
        statusCode = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/delete/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.status);
    }
    return Response.json({}, {
        status: statusCode,
    })
}