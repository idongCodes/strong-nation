import { NextResponse } from 'next/server';
import { Redis } from 'ioredis';

const getRedis = () => {
  if (process.env.REDIS_URL) {
    return new Redis(process.env.REDIS_URL);
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

    const data = await redis.get('rsvps');
    const rsvps: Record<string, unknown>[] = data ? JSON.parse(data) : [];

    const newRsvp = {
      ...body,
      timestamp: now.toISOString(),
    };
    
    rsvps.push(newRsvp);

    await redis.set('rsvps', JSON.stringify(rsvps));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API RSVP Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}