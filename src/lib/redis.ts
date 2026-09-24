/**
 * Upstash Redis REST Client
 * Inspects 4 possible Vercel / Upstash environment credential prefixes.
 * Returns null gracefully if unconfigured or falls back seamlessly in client-side preview.
 */

export interface RedisConfig {
  url: string;
  token: string;
}

export function getRedisCredentials(): RedisConfig | null {
  // Check process.env (Server-side Next.js / Node.js)
  if (typeof process !== 'undefined' && process.env) {
    const url =
      process.env.UPSTASH_REDIS_REST_URL ||
      process.env.KV_REST_API_URL ||
      process.env.STORAGE_REST_API_URL ||
      process.env.STORAGE_KV_REST_API_URL;

    const token =
      process.env.UPSTASH_REDIS_REST_TOKEN ||
      process.env.KV_REST_API_TOKEN ||
      process.env.STORAGE_REST_API_TOKEN ||
      process.env.STORAGE_KV_REST_API_TOKEN;

    if (url && token) {
      return { url, token };
    }
  }

  // Check import.meta.env (Vite client)
  if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
    const env = (import.meta as any).env;
    const url =
      env.VITE_UPSTASH_REDIS_REST_URL ||
      env.VITE_KV_REST_API_URL;
    const token =
      env.VITE_UPSTASH_REDIS_REST_TOKEN ||
      env.VITE_KV_REST_API_TOKEN;

    if (url && token) {
      return { url, token };
    }
  }

  return null;
}

export async function redisCommand(command: string[]): Promise<any> {
  const creds = getRedisCredentials();
  if (!creds) {
    return null;
  }

  try {
    const res = await fetch(`${creds.url}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${creds.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
    });

    if (!res.ok) {
      console.warn(`Redis command failed with status ${res.status}`);
      return null;
    }

    const data = await res.json();
    return data.result;
  } catch (err) {
    console.warn('Redis REST error:', err);
    return null;
  }
}

export async function redisGet<T>(key: string): Promise<T | null> {
  const res = await redisCommand(['GET', key]);
  if (!res) return null;
  try {
    return typeof res === 'string' ? JSON.parse(res) : res;
  } catch {
    return res as unknown as T;
  }
}

export async function redisSet(key: string, value: any, expireSeconds?: number): Promise<boolean> {
  const serialized = typeof value === 'string' ? value : JSON.stringify(value);
  const cmd = expireSeconds 
    ? ['SET', key, serialized, 'EX', expireSeconds.toString()] 
    : ['SET', key, serialized];
  const res = await redisCommand(cmd);
  return res === 'OK' || res !== null;
}

export async function redisDel(key: string): Promise<boolean> {
  const res = await redisCommand(['DEL', key]);
  return res !== null;
}

export async function redisKeys(pattern: string): Promise<string[]> {
  const res = await redisCommand(['KEYS', pattern]);
  return Array.isArray(res) ? res : [];
}
