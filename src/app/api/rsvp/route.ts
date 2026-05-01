import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const RSVPS_FILE = path.join(DATA_DIR, 'rsvps.json');

export async function POST(request: Request) {
  try {
    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR);
    }

    const body = await request.json();
    const now = new Date();

    // Read existing RSVPs
    let rsvps: any[] = [];
    if (fs.existsSync(RSVPS_FILE)) {
      const fileData = fs.readFileSync(RSVPS_FILE, 'utf-8');
      if (fileData) {
        try {
          rsvps = JSON.parse(fileData);
        } catch (e) {
          console.error("Error parsing rsvps.json", e);
        }
      }
    }

    // Add new RSVP
    const newRsvp = {
      ...body,
      timestamp: now.toISOString(),
    };
    rsvps.push(newRsvp);

    // Save back to file
    fs.writeFileSync(RSVPS_FILE, JSON.stringify(rsvps, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API RSVP Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}