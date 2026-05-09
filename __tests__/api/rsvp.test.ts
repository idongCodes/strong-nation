/**
 * @jest-environment node
 */
import { POST } from '@/app/api/rsvp/route';
import { Redis } from '@upstash/redis';

// Mock the @upstash/redis module
jest.mock('@upstash/redis', () => ({
  Redis: {
    fromEnv: jest.fn(),
  },
}));

describe('RSVP API Route', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns a 500 error if Redis environment variables are missing', async () => {
    // Ensure environment variables are missing
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    
    // getRedis will return null
    (Redis.fromEnv as jest.Mock).mockReturnValue(null);

    const request = new Request('http://localhost/api/rsvp', {
      method: 'POST',
      body: JSON.stringify({ firstName: 'John', lastName: 'Doe', rsvpDate: '01/01' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Redis database is not configured yet.');
  });

  it('successfully saves an RSVP when Redis is configured', async () => {
    // Set mock environment variables
    process.env.UPSTASH_REDIS_REST_URL = 'https://fake-redis-url.com';
    process.env.UPSTASH_REDIS_REST_TOKEN = 'fake-token';

    const mockGet = jest.fn().mockResolvedValue([]);
    const mockSet = jest.fn().mockResolvedValue('OK');

    (Redis.fromEnv as jest.Mock).mockReturnValue({
      get: mockGet,
      set: mockSet,
    });

    const requestBody = { firstName: 'Jane', lastName: 'Smith', rsvpDate: '01/08' };
    const request = new Request('http://localhost/api/rsvp', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);

    // Verify Redis was interacted with correctly
    expect(mockGet).toHaveBeenCalledWith('rsvps');
    expect(mockSet).toHaveBeenCalledWith('rsvps', expect.arrayContaining([
      expect.objectContaining({
        firstName: 'Jane',
        lastName: 'Smith',
        rsvpDate: '01/08',
      })
    ]));
  });
});
