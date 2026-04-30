// HTTP client using native fetch — no external dependency needed


const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const httpClient = {
  get: async <T>(path: string, headers?: Record<string, string>): Promise<T> => {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...headers },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json() as Promise<T>;
  },

  post: async <T>(path: string, body: unknown, headers?: Record<string, string>): Promise<T> => {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json() as Promise<T>;
  },
};

export default httpClient;