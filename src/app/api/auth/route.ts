export async function POST(request: Request) {
  const body = await request.json();
  const token = body.token as string;
  const csrfToken = body.csrf_token as string;
  const id = body.id as number;
  if (!token || !csrfToken || !id) {
    return Response.json({ message: 'Token or csrfToken not found' }, { status: 400 });
  }

  const header = new Headers();
  header.append('Set-Cookie', `token=${token}; Path=/; HttpOnly; Secure;`);
  header.append('Set-Cookie', `csrfToken=${csrfToken}; Path=/; HttpOnly; Secure;`);
  header.append('Set-Cookie', `id=${id}; Path=/; HttpOnly; Secure;`);

  return Response.json(body, {
    status: 200,
    headers: header,
  });
}
