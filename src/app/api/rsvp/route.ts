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

    // Determine the most recent "Thursday 11:59 PM" cutoff
    const getPreviousThursdayCutoff = () => {
      const date = new Date(now);
      const day = date.getDay();
      
      let daysToSubtract = (day - 4 + 7) % 7;
      
      // If it's Thursday and before 11:59 PM, the cutoff is the previous week's Thursday
      if (day === 4) {
        if (date.getHours() < 23 || (date.getHours() === 23 && date.getMinutes() < 59)) {
          daysToSubtract = 7;
        }
      }
      
      date.setDate(date.getDate() - daysToSubtract);
      date.setHours(23, 59, 0, 0);
      return date;
    };

    const cutoff = getPreviousThursdayCutoff();

    // Filter RSVPs to only include those submitted after the cutoff
    const validRsvps = rsvps.filter((r: any) => new Date(r.timestamp) > cutoff);

    // Add new RSVP
    const newRsvp = {
      ...body,
      timestamp: now.toISOString(),
    };
    validRsvps.push(newRsvp);

    // Save back to file
    fs.writeFileSync(RSVPS_FILE, JSON.stringify(validRsvps, null, 2));

    // Prepare payload for FormSubmit to format beautifully into a table
    const headcount = validRsvps.length;
    
    // We send a structured object that FormSubmit turns into a Key-Value table
    const payload: Record<string, string | number> = {
      _subject: `New RSVP - Total Headcount: ${headcount} (Thursday ${body.rsvpDate})`,
      "Total Headcount": headcount,
      "New Submission Name": `${body.firstName} ${body.lastName}`
    };

    // Add all current week's RSVPs to the table
    validRsvps.forEach((rsvp: any, index: number) => {
      const pref = rsvp.preferredName ? `"${rsvp.preferredName}"` : "";
      const contactParts = [];
      if (rsvp.phone) contactParts.push(rsvp.phone);
      if (rsvp.email) contactParts.push(rsvp.email);
      const contact = contactParts.join(" / ");
      
      payload[`Visitor ${index + 1}`] = `${rsvp.firstName} ${rsvp.lastName} ${pref} ${contact ? `(${contact})` : ''}`;
    });

    // Add formsubmit.co target
    // The target email is added directly to the URL or we use the _to if configured, but default behavior:
    // fetch to the specific email ajax endpoint.
    const formSubmitRes = await fetch("https://formsubmit.co/ajax/idongesit_essien@ymail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!formSubmitRes.ok) {
      throw new Error("FormSubmit failed");
    }

    return NextResponse.json({ success: true, headcount });
  } catch (error) {
    console.error("API RSVP Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
