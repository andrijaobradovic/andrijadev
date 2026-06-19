import "server-only";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const memoryStore = new Map<string, number[]>();

function getRedisRestConfig(): { url: string; token: string } | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

  if (url && token) {
    return { url, token };
  }

  return null;
}

function createDistributedLimiter(): Ratelimit | null {
  const config = getRedisRestConfig();
  if (!config) {
    return null;
  }

  return new Ratelimit({
    redis: new Redis({ url: config.url, token: config.token }),
    limiter: Ratelimit.slidingWindow(RATE_LIMIT_MAX, "10 m"),
    prefix: "contact-form",
  });
}

const distributedLimiter = createDistributedLimiter();

function isRateLimitedInMemory(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const hits = (memoryStore.get(ip) ?? []).filter(
    (timestamp) => timestamp > windowStart
  );

  if (hits.length >= RATE_LIMIT_MAX) {
    memoryStore.set(ip, hits);
    return true;
  }

  hits.push(now);
  memoryStore.set(ip, hits);
  return false;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function isContactRateLimited(ip: string): Promise<boolean> {
  if (distributedLimiter) {
    const { success } = await distributedLimiter.limit(ip);
    return !success;
  }

  return isRateLimitedInMemory(ip);
}
