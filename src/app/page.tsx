import TopBar from "@/components/TopBar";

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

      {/* Spacer to demonstrate the gradient blending into the black page body */}
      <div className="h-64 bg-black w-full"></div>
    </main>
  );
}
