import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

async function check() {
  try {
    const data = await redis.get('testimonials');
    console.log("Type:", typeof data);
    console.log("IsArray?", Array.isArray(data));
    console.log("Value:", data);
  } catch (e) {
    console.error("Error:", e);
  }
}
check();