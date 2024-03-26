export async function GET(request) {
    const { searchParams } = request.nextUrl;
    const q = searchParams.get('q');
    let results = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/search?q=${q}`).then(res => res.json()).then(res => res);
    return Response.json(results);
}