import TopBar from "@/components/TopBar";
import ContactForm from "@/components/ContactForm";
import RsvpForm from "@/components/RsvpForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black">
      <TopBar />
      
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        {/* Background Image Container */}
        <div 
          className="absolute inset-0 z-0 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        
        {/* Hero Content (Removed for now) */}
      </section>

      {/* About Section */}
      <section id="about" className="w-full bg-black py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl text-center text-[#8A2BE2] mb-10 tracking-widest uppercase drop-shadow-md">
            About Strong Nation
          </h2>
          <p className="text-lg text-zinc-300 leading-relaxed" style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
            Strong Nation is dedicated to building a community of resilience, strength, and continuous improvement. 
            We believe in pushing boundaries, both physically and mentally, to achieve greatness. Join us on our 
            journey to empower individuals and create a lasting impact.
          </p>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="w-full bg-black py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center text-[#8A2BE2] mb-6 tracking-widest uppercase drop-shadow-md">
            RSVP
          </h2>
          <p className="text-center text-zinc-300 mb-10 leading-relaxed text-lg" style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
            We're excited to see you join us as we get together, have fun, encourage and motivate each other every Thursday from 6:45pm. All levels welcome. Come as you are, leave stronger. Let us know you'll be joining us!
          </p>
          <RsvpForm />
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="w-full bg-black py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center text-[#8A2BE2] mb-10 tracking-widest uppercase drop-shadow-md">
            FAQs
          </h2>
          <div className="space-y-6" style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-md">
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">I want to join but I am concerned about childcare...</h3>
              <p className="text-zinc-400 leading-relaxed">Placeholder answer.</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-md">
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Do I need any kind of membership to join?</h3>
              <p className="text-zinc-400 leading-relaxed">Placeholder answer.</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-md">
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Are there any age restrictions?</h3>
              <p className="text-zinc-400 leading-relaxed">Placeholder answer.</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-md">
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">How long is each session?</h3>
              <p className="text-zinc-400 leading-relaxed">Placeholder answer.</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-md">
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Who is this organised by?</h3>
              <p className="text-zinc-400 leading-relaxed">Placeholder answer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full bg-black py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center text-[#8A2BE2] mb-10 tracking-widest uppercase drop-shadow-md">
            Contact Strong Nation
          </h2>
          
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
