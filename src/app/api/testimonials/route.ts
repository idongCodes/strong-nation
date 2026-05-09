import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Safely instantiate Redis only if environment variables are available
const getRedis = () => {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return Redis.fromEnv();
  }
  return null;
};

export async function GET() {
  try {
    const redis = getRedis();
    if (!redis) {
      console.warn("Redis environment variables not set. Returning empty testimonials.");
      return NextResponse.json([]);
    }

    // Fetch testimonials from KV store
    const testimonials = await redis.get('testimonials');
    return NextResponse.json(testimonials || []);
  } catch (error) {
    console.error("API GET Testimonials Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const redis = getRedis();

    if (!redis) {
      return NextResponse.json({ error: 'Redis database is not configured yet.' }, { status: 500 });
    }

    // Fetch existing testimonials
    const testimonials: Record<string, unknown>[] = (await redis.get('testimonials') as Record<string, unknown>[]) || [];

    const newTestimonial = {
      ...body,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };

    // Add to the beginning of the array so newest is first
    testimonials.unshift(newTestimonial);

    // Save updated array back to KV
    await redis.set('testimonials', testimonials);

    return NextResponse.json(newTestimonial);
  } catch (error) {
    console.error("API POST Testimonials Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}