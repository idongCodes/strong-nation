import TopBar from "@/components/TopBar";
import ContactForm from "@/components/ContactForm";

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
