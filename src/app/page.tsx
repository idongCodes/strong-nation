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
