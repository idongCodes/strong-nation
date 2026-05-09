import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const TESTIMONIALS_FILE = path.join(DATA_DIR, 'testimonials.json');

// Helper to safely read testimonials
function getTestimonials() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
  }
  
  if (fs.existsSync(TESTIMONIALS_FILE)) {
    const fileData = fs.readFileSync(TESTIMONIALS_FILE, 'utf-8');
    if (fileData) {
      try {
        return JSON.parse(fileData);
      } catch (e) {
        console.error("Error parsing testimonials.json", e);
      }
    }
  }
  return [];
}

export async function GET() {
  try {
    const testimonials = getTestimonials();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("API GET Testimonials Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const testimonials = getTestimonials();

    const newTestimonial = {
      ...body,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };

    // Add to the beginning of the array so newest is first
    testimonials.unshift(newTestimonial);

    fs.writeFileSync(TESTIMONIALS_FILE, JSON.stringify(testimonials, null, 2));

    return NextResponse.json(newTestimonial);
  } catch (error) {
    console.error("API POST Testimonials Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
