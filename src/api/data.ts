export async function getUserInfo(token: string) {
  try {
    const res = await fetch('http://localhost:8000/api/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(error);
  }
}
