import { supabase } from "../lib/supabaseClient";

export default function Dashboard({ user, status, onSave, unsyncedCount, behavior, setBehavior }) {
  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#143d2d] via-[#255d3f] to-[#4b865b] text-niabi-cream flex flex-col items-center justify-center px-6 py-12">
      {/* Header */}
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-niabi-yellow/20 p-10 text-center">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-niabi-yellow tracking-wide">
            Niabi Prairie Dog Observation App
          </h1>
          <button
            onClick={handleSignOut}
            className="text-sm text-niabi-cream bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-md font-semibold transition"
          >
            Sign Out
          </button>
        </div>

        {/* Status */}
        <p className="text-sm mb-4">
          Logged in as <span className="font-semibold text-niabi-yellow">{user.email}</span>
        </p>
        <p>
          Status:{" "}
          <strong
            className={`font-semibold ${
              status === "Online" ? "text-green-400" : "text-red-400"
            }`}
          >
            {status}
          </strong>
        </p>

        {/* Observation Input */}
        <div className="mt-8 flex justify-center gap-3">
          <input
            type="text"
            placeholder="Enter observed behavior..."
            value={behavior}
            onChange={(e) => setBehavior(e.target.value)}
            className="p-3 w-2/3 rounded-lg bg-white/20 border border-niabi-yellow/30 placeholder-niabi-cream/70 text-niabi-cream focus:ring-2 focus:ring-niabi-emerald outline-none"
          />
          <button
            onClick={onSave}
            className="bg-niabi-yellow text-niabi-deepnavy font-bold px-6 py-3 rounded-lg hover:brightness-110 transition"
          >
            Save Observation
          </button>
        </div>

        {/* Footer Info */}
        <p className="mt-6 text-sm text-niabi-cream/80">
          <strong>{unsyncedCount}</strong> unsynced records saved locally
        </p>
      </div>
    </div>
  );
}