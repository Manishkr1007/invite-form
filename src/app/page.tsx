import { FiArrowRight, FiFilm } from "react-icons/fi";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3B1F44] to-[#5A3B6B] p-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-10 flex flex-col items-center max-w-md w-full">
        <div className="flex items-center gap-3 mb-4">
          <FiFilm className="text-pink-400 text-4xl" />
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Invite </h1>
        </div>
        <p className="text-[#E0D6EB] text-center mb-8">
          Welcome! Create beautiful video invitations for your special events in minutes.
        </p>
        <a
          href="/create"
          className="flex items-center gap-2 bg-pink-500 hover:bg-pink-400 active:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg shadow transition-all duration-200 cursor-pointer text-lg"
        >
          Get Started <FiArrowRight className="text-xl" />
        </a>
        <div className="mt-8 text-xs text-[#BCA9D6] text-center">
          Made with <span className="text-pink-400">♥</span> for your special moments.
        </div>
      </div>
    </main>
  );
}