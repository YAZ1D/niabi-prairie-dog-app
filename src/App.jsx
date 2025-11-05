import { useState, useEffect } from "react";
import { supabase } from "./lib/supabaseClient";
import AuthPanel from "./components/AuthPanel";
import UserBar from "./components/UserBar";
import { saveObservation } from "./data/storage";
import "./App.css";

console.log("✅ USING ENHANCED App.jsx");

export default function App() {
  const [user, setUser] = useState(null);
  const [behavior, setBehavior] = useState("");
  const [unsyncedCount, setUnsyncedCount] = useState(0);
  const [status, setStatus] = useState(navigator.onLine ? "Online" : "Offline");

  // === Supabase auth state ===
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // === Network status listener ===
  useEffect(() => {
    const handleStatusChange = () => {
      setStatus(navigator.onLine ? "Online" : "Offline");
    };
    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, []);

  // === Observation save ===
  async function handleSave() {
    const total = await saveObservation({
      behavior,
      observer: user?.email ?? "anonymous",
      timestamp: new Date().toISOString(),
    });
    setUnsyncedCount(total);
    setBehavior("");
  }

  // === Gate: not signed in ===
  if (!user) {
    return (
      <div className="App">
        {/* Removed top title + paragraph to let AuthPanel control its own visuals */}
        <AuthPanel />
      </div>
    );
  }

  // === Main logged-in UI ===
  return (
    <div
      className="App"
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "2rem",
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <UserBar />

      <h1 style={{ marginBottom: "0.5rem" }}>
        Niabi Prairie Dog Observation App
      </h1>
      <p>
        Status:{" "}
        <strong
          style={{
            color: status === "Online" ? "green" : "red",
            fontWeight: 600,
          }}
        >
          {status}
        </strong>
      </p>

      <div style={{ marginTop: "1.5rem" }}>
        <input
          type="text"
          placeholder="Enter observed behavior"
          value={behavior}
          onChange={(e) => setBehavior(e.target.value)}
          style={{
            padding: "10px",
            width: "70%",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginRight: "8px",
          }}
        />
        <button
          onClick={handleSave}
          style={{
            padding: "10px 18px",
            backgroundColor: "#007BFF",
            border: "none",
            borderRadius: "6px",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Save Observation
        </button>
      </div>

      <p style={{ marginTop: "1.5rem" }}>
        <strong>{unsyncedCount}</strong> unsynced records saved locally
      </p>

      <footer style={{ marginTop: "2rem", fontSize: "0.9rem", color: "#666" }}>
        Logged in as <strong>{user.email}</strong>
      </footer>
    </div>
  );
}
