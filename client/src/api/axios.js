const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

function getAuthToken() {
  return (
    localStorage.getItem('emsToken') ||
    localStorage.getItem('token') ||
    null
  );
}

async function parseJsonOrText(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}

async function request(method, url, body) {
  const fullUrl = `${baseURL}${url.startsWith('/') ? '' : '/'}${url}`;
  const token = getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(fullUrl, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const data = await parseJsonOrText(res);

  if (!res.ok) {
    const error = new Error('Request failed');
    error.response = { data, status: res.status };
    throw error;
  }

  return { data };
}

const api = {
  get: (url) => request('GET', url),
  post: (url, body) => request('POST', url, body),
  put: (url, body) => request('PUT', url, body),
};

export default api;
