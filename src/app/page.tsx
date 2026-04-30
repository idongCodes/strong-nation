import TopBar from "@/components/TopBar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black">
      <TopBar />
      
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        {/* Background Image Container */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        />
        
        {/* Gradient Overlays for the "Fade to Black" effects */}
        {/* 1. Overall dark wash to make it almost fade into black */}
        <div className="absolute inset-0 z-0 bg-black/50" />
        
        {/* 2. Strong bottom gradient fading into pure black at the bottom edge */}
        <div className="absolute inset-x-0 bottom-0 z-0 h-3/4 bg-gradient-to-t from-black via-black/70 to-transparent" />
        
        {/* Hero Content (Removed for now) */}
      </section>

      {/* Spacer to demonstrate the gradient blending into the black page body */}
      <div className="h-64 bg-black w-full"></div>
    </main>
  );
}
