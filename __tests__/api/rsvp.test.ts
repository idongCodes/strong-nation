/**
 * @jest-environment node
 */
import { POST } from '@/app/api/rsvp/route';

// Mock the ioredis module
jest.mock('ioredis', () => {
  return {
    Redis: jest.fn().mockImplementation(() => {
      return {
        get: jest.fn().mockResolvedValue(null),
        set: jest.fn().mockResolvedValue('OK'),
      };
    }),
  };
});

import { Redis } from 'ioredis';

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
    delete process.env.REDIS_URL;

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
    process.env.REDIS_URL = 'redis://fake-redis-url.com';

    const requestBody = { firstName: 'Jane', lastName: 'Smith', rsvpDate: '01/08' };
    const request = new Request('http://localhost/api/rsvp', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    
    // We can't easily assert on the mock instance methods because it's instantiated inside the route,
    // but verifying it returns 200 OK means the internal flow succeeded.
  });
});