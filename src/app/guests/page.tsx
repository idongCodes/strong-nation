import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

function getCutoffs() {
  const now = new Date();
  const day = now.getDay();
  
  const thisWeekThursday = new Date(now);
  thisWeekThursday.setDate(now.getDate() - day + 4);
  thisWeekThursday.setHours(18, 45, 0, 0);

  let startCutoff, endCutoff;

  if (now.getTime() >= thisWeekThursday.getTime()) {
    // We are past this week's Thursday 6:45 PM
    startCutoff = new Date(thisWeekThursday);
    endCutoff = new Date(thisWeekThursday);
    endCutoff.setDate(endCutoff.getDate() + 7);
  } else {
    // We are before this week's Thursday 6:45 PM
    startCutoff = new Date(thisWeekThursday);
    startCutoff.setDate(startCutoff.getDate() - 7);
    endCutoff = new Date(thisWeekThursday);
  }

  return { startCutoff, endCutoff };
}

export default async function GuestsPage() {
  const dataDir = path.join(process.cwd(), 'data');
  const rsvpsFile = path.join(dataDir, 'rsvps.json');
  
  let rsvps: any[] = [];
  if (fs.existsSync(rsvpsFile)) {
    const fileData = fs.readFileSync(rsvpsFile, 'utf-8');
    if (fileData) {
      try {
        rsvps = JSON.parse(fileData);
      } catch (e) {
        console.error("Failed to parse rsvps.json", e);
      }
    }
  }

  const { startCutoff, endCutoff } = getCutoffs();

  // Filter for the upcoming class
  const upcomingRsvps = rsvps.filter((r: any) => {
    const ts = new Date(r.timestamp).getTime();
    return ts >= startCutoff.getTime() && ts < endCutoff.getTime();
  });

  const sortedUpcoming = upcomingRsvps.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  const sortedAll = rsvps.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 pt-20 md:pt-24">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-[#8A2BE2] uppercase tracking-wider" style={{ fontFamily: 'var(--font-rubik-dirt), ui-sans-serif, system-ui, sans-serif' }}>Guest RSVPs</h1>
      
      <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-5 md:p-6 mb-8 shadow-[0_0_15px_rgba(138,43,226,0.15)]">
        <h2 className="text-lg md:text-xl font-semibold mb-2 text-zinc-300 uppercase tracking-wide">Upcoming Class Headcount</h2>
        <p className="text-xs md:text-sm text-zinc-400 mb-4">
          Collecting RSVPs from {startCutoff.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })} to {endCutoff.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
        </p>
        <div className="text-4xl md:text-5xl font-bold text-white">
          {upcomingRsvps.length}
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#8A2BE2] uppercase tracking-wider" style={{ fontFamily: 'var(--font-rubik-dirt), ui-sans-serif, system-ui, sans-serif' }}>Upcoming Class RSVPs</h2>
      
      {/* Mobile view for Upcoming Class */}
      <div className="md:hidden flex flex-col space-y-4 mb-8">
        {sortedUpcoming.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 text-center text-zinc-500 italic">
            No RSVPs for the upcoming class yet.
          </div>
        ) : (
          sortedUpcoming.map((rsvp: any, idx: number) => (
            <div key={idx} className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 shadow-md flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <span className="font-bold text-lg text-white">{rsvp.firstName} {rsvp.lastName}</span>
                <span className="text-xs px-2 py-1 bg-zinc-800 rounded-md text-zinc-400">{rsvp.rsvpDate}</span>
              </div>
              {rsvp.preferredName && (
                <div className="text-sm text-zinc-300">Prefers: <span className="text-zinc-100">{rsvp.preferredName}</span></div>
              )}
              <div className="text-sm text-zinc-400 flex flex-col gap-1 mt-1">
                {rsvp.email && <div><span className="text-zinc-500">Email:</span> {rsvp.email}</div>}
                {rsvp.phone && <div><span className="text-zinc-500">Phone:</span> {rsvp.phone}</div>}
              </div>
              <div className="text-xs text-zinc-500 mt-2 border-t border-zinc-800 pt-2">
                Submitted: {new Date(rsvp.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop view for Upcoming Class */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-zinc-700 shadow-xl mb-12">
        <table className="w-full text-left border-collapse min-w-max">
          <thead>
            <tr className="bg-zinc-800 text-zinc-300 uppercase tracking-wide text-xs border-b border-zinc-700">
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Preferred Name</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Phone</th>
              <th className="px-6 py-4 font-semibold">RSVP Date</th>
              <th className="px-6 py-4 font-semibold">Submitted At</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-900 divide-y divide-zinc-800">
            {sortedUpcoming.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-zinc-500 italic">
                  No RSVPs for the upcoming class yet.
                </td>
              </tr>
            ) : (
              sortedUpcoming.map((rsvp: any, idx: number) => (
                <tr key={idx} className="hover:bg-zinc-800/50 transition-colors text-sm text-zinc-200">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{rsvp.firstName} {rsvp.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{rsvp.preferredName || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-zinc-400">{rsvp.email || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-zinc-400">{rsvp.phone || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{rsvp.rsvpDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-zinc-500">
                    {new Date(rsvp.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#8A2BE2] uppercase tracking-wider" style={{ fontFamily: 'var(--font-rubik-dirt), ui-sans-serif, system-ui, sans-serif' }}>All Past RSVPs</h2>
      
      {/* Mobile view for All Past RSVPs */}
      <div className="md:hidden flex flex-col space-y-4 mb-12">
        {sortedAll.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 text-center text-zinc-500 italic">
            No RSVPs found.
          </div>
        ) : (
          sortedAll.map((rsvp: any, idx: number) => (
            <div key={idx} className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 shadow-md flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <span className="font-bold text-lg text-white">{rsvp.firstName} {rsvp.lastName}</span>
                <span className="text-xs px-2 py-1 bg-zinc-800 rounded-md text-zinc-400">{rsvp.rsvpDate}</span>
              </div>
              {rsvp.preferredName && (
                <div className="text-sm text-zinc-300">Prefers: <span className="text-zinc-100">{rsvp.preferredName}</span></div>
              )}
              <div className="text-sm text-zinc-400 flex flex-col gap-1 mt-1">
                {rsvp.email && <div><span className="text-zinc-500">Email:</span> {rsvp.email}</div>}
                {rsvp.phone && <div><span className="text-zinc-500">Phone:</span> {rsvp.phone}</div>}
              </div>
              <div className="text-xs text-zinc-500 mt-2 border-t border-zinc-800 pt-2">
                Submitted: {new Date(rsvp.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop view for All Past RSVPs */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-zinc-700 shadow-xl mb-12">
        <table className="w-full text-left border-collapse min-w-max">
          <thead>
            <tr className="bg-zinc-800 text-zinc-300 uppercase tracking-wide text-xs border-b border-zinc-700">
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Preferred Name</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Phone</th>
              <th className="px-6 py-4 font-semibold">RSVP Date</th>
              <th className="px-6 py-4 font-semibold">Submitted At</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-900 divide-y divide-zinc-800">
            {sortedAll.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-zinc-500 italic">
                  No RSVPs found.
                </td>
              </tr>
            ) : (
              sortedAll.map((rsvp: any, idx: number) => (
                <tr key={idx} className="hover:bg-zinc-800/50 transition-colors text-sm text-zinc-200">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{rsvp.firstName} {rsvp.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{rsvp.preferredName || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-zinc-400">{rsvp.email || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-zinc-400">{rsvp.phone || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{rsvp.rsvpDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-zinc-500">
                    {new Date(rsvp.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}