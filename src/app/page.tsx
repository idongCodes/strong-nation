import TopBar from "@/components/TopBar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black">
      <TopBar />
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl text-center text-white mb-4">Welcome to Strong Nation</h1>
        <p className="text-center text-gray-400">The app structure is ready.</p>
      </div>
    </main>
  );
}