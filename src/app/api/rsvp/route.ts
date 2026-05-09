import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Safely instantiate Redis only if environment variables are available
const getRedis = () => {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return Redis.fromEnv();
  }
  return null;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const now = new Date();
    const redis = getRedis();

    if (!redis) {
      return NextResponse.json({ error: 'Redis database is not configured yet.' }, { status: 500 });
    }

    // Fetch existing RSVPs
    const rsvps: Record<string, unknown>[] = (await redis.get('rsvps') as Record<string, unknown>[]) || [];

    const newRsvp = {
      ...body,
      timestamp: now.toISOString(),
    };
    
    // Add new RSVP
    rsvps.push(newRsvp);

    // Save updated array back to KV
    await redis.set('rsvps', rsvps);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API RSVP Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
