import ContactForm from "@/components/ContactForm";
import RsvpForm from "@/components/RsvpForm";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black">
      
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        {/* Background Image Container */}
        <div 
          className="absolute inset-0 z-0 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        
        {/* Hero Content (Removed for now) */}
      </section>

      {/* Highlights Section */}
      <section id="highlights" className="w-full bg-black py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center text-[#8A2BE2] mb-12 tracking-widest uppercase drop-shadow-md">
            Program Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center" style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
            <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-md shadow-sm flex flex-col items-center justify-center transition-transform hover:scale-105 duration-300">
              <div className="text-[#8A2BE2] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Synced to Music</h3>
              <p className="text-zinc-400">Every beat is perfectly synced to match each move, driving you to push past your limits.</p>
            </div>
            
            <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-md shadow-sm flex flex-col items-center justify-center transition-transform hover:scale-105 duration-300">
              <div className="text-[#8A2BE2] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">HIIT Incorporation</h3>
              <p className="text-zinc-400">High-Intensity Interval Training burns more calories and keeps your metabolism elevated.</p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-md shadow-sm flex flex-col items-center justify-center transition-transform hover:scale-105 duration-300">
              <div className="text-[#8A2BE2] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Free Weights</h3>
              <p className="text-zinc-400">Strategically incorporates free weights to build muscle, enhance strength, and tone your body.</p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-md shadow-sm flex flex-col items-center justify-center transition-transform hover:scale-105 duration-300">
              <div className="text-[#8A2BE2] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">All Levels Welcome</h3>
              <p className="text-zinc-400">Modifications and options available so everyone can get a safe and effective workout.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full bg-black py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl text-center text-[#8A2BE2] mb-6 tracking-widest uppercase drop-shadow-md">
            About Strong Nation
          </h2>

          {/* Mission & Vision Statements */}
          <div className="mb-12 space-y-6 text-zinc-300 leading-relaxed text-lg text-left" style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
            <p className="italic">
              <strong className="text-[#8A2BE2]">Our Vision:</strong> To empower every individual to discover their inner strength, fostering a community where physical and mental resilience thrive, creating a lasting impact on personal well-being and collective spirit.
            </p>
            <p className="italic">
              <strong className="text-[#8A2BE2]">Our Mission:</strong> To provide an inclusive and dynamic environment that encourages pushing boundaries, embracing challenges, and celebrating every step of the journey towards a stronger self through high-energy, community-focused fitness.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left" style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-md shadow-sm">
              <h3 className="text-2xl font-bold text-[#8A2BE2] mb-3 uppercase tracking-wide">Who</h3>
              <p className="text-zinc-300 leading-relaxed">
                Strong Nation is a community of individuals dedicated to resilience and continuous improvement. All fitness levels are welcome, from beginners to advanced athletes.
              </p>
            </div>
            
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-md shadow-sm">
              <h3 className="text-2xl font-bold text-[#8A2BE2] mb-3 uppercase tracking-wide">What</h3>
              <p className="text-zinc-300 leading-relaxed">
                A high-intensity, music-led workout program that pushes boundaries physically and mentally. We combine body weight, muscle conditioning, cardio, and plyometric training.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-md shadow-sm">
              <h3 className="text-2xl font-bold text-[#8A2BE2] mb-3 uppercase tracking-wide">When</h3>
              <p className="text-zinc-300 leading-relaxed">
                We get together to encourage and motivate each other every Thursday evening starting at 6:45 PM.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-md shadow-sm">
              <h3 className="text-2xl font-bold text-[#8A2BE2] mb-3 uppercase tracking-wide">Where</h3>
              <p className="text-zinc-300 leading-relaxed">
                Hosted at the YMCA of Central Massachusetts, Main Street Branch, 766 Main St, Worcester, MA 01610. Join us in the main studio where we sweat, smile, and get stronger together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* RSVP Section */}
      <section id="rsvp" className="w-full bg-black py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center text-[#8A2BE2] mb-6 tracking-widest uppercase drop-shadow-md">
            RSVP
          </h2>
          <p className="text-center text-zinc-300 mb-10 leading-relaxed text-lg" style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
            We&apos;re excited to see you join us as we get together, have fun, encourage and motivate each other every Thursday from 6:45pm. All levels welcome. Come as you are, leave stronger. Let us know you&apos;ll be joining us!
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
              <p className="text-zinc-400 leading-relaxed">The YMCA offers Child Watch and Child Development services, allowing you to focus entirely on your workout while your kids are safely supervised.</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-md">
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Do I need any kind of membership to join?</h3>
              <p className="text-zinc-400 leading-relaxed">No strict membership is required! While YMCA memberships offer great benefits, we welcome everyone. Financial assistance is also available to ensure everyone can participate.</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-md">
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Are there any age restrictions?</h3>
              <p className="text-zinc-400 leading-relaxed">Our classes are designed for adults and teens, but we welcome individuals of all fitness levels. Check with the instructor if you have specific age-related concerns.</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-md">
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">How long is each session?</h3>
              <p className="text-zinc-400 leading-relaxed">Each session typically runs for about 45 to 60 minutes. This includes a comprehensive warm-up, the main workout, and a cool-down period.</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-md">
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Who is this organised by?</h3>
              <p className="text-zinc-400 leading-relaxed">This community program is proudly organized and hosted by the YMCA of Central Massachusetts, reflecting our commitment to youth development, healthy living, and social responsibility.</p>
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
