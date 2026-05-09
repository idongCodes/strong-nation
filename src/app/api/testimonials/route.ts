import { NextResponse } from 'next/server';
import { Redis } from 'ioredis';

const getRedis = () => {
  if (process.env.REDIS_URL) {
    return new Redis(process.env.REDIS_URL);
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

    const data = await redis.get('testimonials');
    const testimonials = data ? JSON.parse(data) : [];
    return NextResponse.json(testimonials);
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

    const data = await redis.get('testimonials');
    const testimonials: Record<string, unknown>[] = data ? JSON.parse(data) : [];

    const newTestimonial = {
      ...body,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };

    testimonials.unshift(newTestimonial);

    await redis.set('testimonials', JSON.stringify(testimonials));

    return NextResponse.json(newTestimonial);
  } catch (error) {
    console.error("API POST Testimonials Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
