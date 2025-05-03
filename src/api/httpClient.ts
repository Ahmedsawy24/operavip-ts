const API = process.env.REACT_APP_API_URL;

async function httpGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json' }
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

async function httpPost<T>(path: string, body: any): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body)
  });
  if (!res.ok) throw new Error(res.statusText);

  // If there's literally no content, bail out with an empty object
  if (res.status === 204 || res.status === 200) {
    return {} as T;
  }

  // Otherwise read the text first, then parse if non-empty
  const text = await res.text();
  return text ? JSON.parse(text) : ({} as T);
}


async function httpPut<T>(path: string, body: any): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

async function httpDelete(path: string): Promise<void> {
  const res = await fetch(`${API}${path}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(res.statusText);
}

export { httpGet, httpPost, httpPut, httpDelete };
