"use client";

import { useState, useEffect } from "react";

export default function RsvpForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [upcomingDate, setUpcomingDate] = useState<string>("");

  useEffect(() => {
    const getUpcomingThursday = () => {
      const now = new Date();
      const dayOfWeek = now.getDay();
      let daysUntilThursday = (4 - dayOfWeek + 7) % 7;
      
      // If today is Thursday but it's past 5:00 PM, target the *next* week's Thursday
      if (dayOfWeek === 4 && now.getHours() >= 17) {
        daysUntilThursday = 7;
      }
      
      const nextThursday = new Date(now);
      nextThursday.setDate(now.getDate() + daysUntilThursday);
      
      const mm = String(nextThursday.getMonth() + 1).padStart(2, '0');
      const dd = String(nextThursday.getDate()).padStart(2, '0');
      return `${mm}/${dd}`;
    };

    setUpcomingDate(getUpcomingThursday());
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, rsvpDate: upcomingDate }),
      });

      if (response.ok) {
        setStatus("success");
        setTimeout(() => setStatus("idle"), 5000);
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-zinc-300 text-sm font-semibold mb-2 uppercase tracking-wide">First Name *</label>
          <input type="text" id="firstName" name="firstName" required disabled={status === "success" || status === "submitting"} className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-md px-4 py-3 focus:outline-none focus:border-[#8A2BE2] focus:ring-1 focus:ring-[#8A2BE2] transition-colors duration-200 disabled:opacity-50" />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="lastName" className="text-zinc-300 text-sm font-semibold mb-2 uppercase tracking-wide">Last Name *</label>
          <input type="text" id="lastName" name="lastName" required disabled={status === "success" || status === "submitting"} className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-md px-4 py-3 focus:outline-none focus:border-[#8A2BE2] focus:ring-1 focus:ring-[#8A2BE2] transition-colors duration-200 disabled:opacity-50" />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="preferredName" className="text-zinc-300 text-sm font-semibold mb-2 uppercase tracking-wide">Preferred First Name</label>
        <input type="text" id="preferredName" name="preferredName" disabled={status === "success" || status === "submitting"} className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-md px-4 py-3 focus:outline-none focus:border-[#8A2BE2] focus:ring-1 focus:ring-[#8A2BE2] transition-colors duration-200 disabled:opacity-50" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-zinc-300 text-sm font-semibold mb-2 uppercase tracking-wide">Email (Optional)</label>
          <input type="email" id="email" name="email" disabled={status === "success" || status === "submitting"} className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-md px-4 py-3 focus:outline-none focus:border-[#8A2BE2] focus:ring-1 focus:ring-[#8A2BE2] transition-colors duration-200 disabled:opacity-50" />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-zinc-300 text-sm font-semibold mb-2 uppercase tracking-wide">Phone (Optional)</label>
          <input type="tel" id="phone" name="phone" disabled={status === "success" || status === "submitting"} className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-md px-4 py-3 focus:outline-none focus:border-[#8A2BE2] focus:ring-1 focus:ring-[#8A2BE2] transition-colors duration-200 disabled:opacity-50" />
        </div>
      </div>

      <p className="text-xs text-zinc-400 italic mt-2">
        *Your RSVP will be for the upcoming Thursday {upcomingDate}
      </p>

      <div className="pt-4 flex justify-center">
        <button 
          type="submit" 
          disabled={status !== "idle"}
          className="px-10 py-3 bg-[#8A2BE2] text-white text-base tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 border-2 border-[#8A2BE2] font-bold shadow-[0_0_10px_rgba(138,43,226,0.3)] hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] rounded-md disabled:opacity-75 disabled:cursor-not-allowed min-w-[250px] flex justify-center items-center"
        >
          {status === "idle" && "Join Us"}
          {status === "submitting" && (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          )}
          {status === "success" && "RSVP Confirmed!"}
          {status === "error" && "Error - Try Again"}
        </button>
      </div>
    </form>
  );
}
