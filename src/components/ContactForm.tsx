"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // Using FormSubmit AJAX API to send the email directly without a page reload
      // Note: The first time this is used, formsubmit.co will send a verification email to the target address.
      const response = await fetch("https://formsubmit.co/ajax/idongesit_essien@ymail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          message: data.message,
          _subject: `New contact from ${data.firstName} ${data.lastName}`,
        }),
      });

      if (response.ok) {
        setStatus("sent");
      } else {
        console.error("Form submission failed");
        setStatus("idle");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("idle");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="space-y-6"
      style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-zinc-300 text-sm font-semibold mb-2 uppercase tracking-wide">First Name</label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName" 
            required 
            disabled={status === "sent"}
            className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-md px-4 py-3 focus:outline-none focus:border-[#8A2BE2] focus:ring-1 focus:ring-[#8A2BE2] transition-colors duration-200 disabled:opacity-50"
            placeholder="Enter your first name"
          />
        </div>
        
        {/* Last Name */}
        <div className="flex flex-col">
          <label htmlFor="lastName" className="text-zinc-300 text-sm font-semibold mb-2 uppercase tracking-wide">Last Name</label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName" 
            required 
            disabled={status === "sent"}
            className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-md px-4 py-3 focus:outline-none focus:border-[#8A2BE2] focus:ring-1 focus:ring-[#8A2BE2] transition-colors duration-200 disabled:opacity-50"
            placeholder="Enter your last name"
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-zinc-300 text-sm font-semibold mb-2 uppercase tracking-wide">Email Address</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required 
          disabled={status === "sent"}
          className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-md px-4 py-3 focus:outline-none focus:border-[#8A2BE2] focus:ring-1 focus:ring-[#8A2BE2] transition-colors duration-200 disabled:opacity-50"
          placeholder="your.email@example.com"
        />
      </div>

      {/* Message Area */}
      <div className="flex flex-col">
        <label htmlFor="message" className="text-zinc-300 text-sm font-semibold mb-2 uppercase tracking-wide">Message</label>
        <textarea 
          id="message" 
          name="message" 
          rows={5} 
          required 
          disabled={status === "sent"}
          className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-md px-4 py-3 focus:outline-none focus:border-[#8A2BE2] focus:ring-1 focus:ring-[#8A2BE2] transition-colors duration-200 resize-y disabled:opacity-50"
          placeholder="How can we help you?"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="pt-4 flex justify-center">
        <button 
          type="submit" 
          disabled={status !== "idle"}
          className="px-10 py-3 bg-[#8A2BE2] text-white text-base tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 border-2 border-[#8A2BE2] font-bold shadow-[0_0_10px_rgba(138,43,226,0.3)] hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] rounded-md disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:bg-[#8A2BE2] disabled:hover:text-white disabled:hover:shadow-[0_0_10px_rgba(138,43,226,0.3)] min-w-[250px]"
        >
          {status === "submitting" ? "Sending..." : status === "sent" ? "Message Sent" : "Send Message"}
        </button>
      </div>
    </form>
  );
}
