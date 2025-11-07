import { useState, useEffect } from "react";
import { supabase } from "./lib/supabaseClient";
import AuthPanel from "./components/AuthPanel";
import Dashboard from "./components/Dashboard";
import { saveObservation } from "./data/storage";
import { useNavigate } from "react-router-dom";
import "./App.css";

console.log("✅ USING SUPABASE DASHBOARD App.jsx");

export default function App() {
  const [user, setUser] = useState(null);
  const [behavior, setBehavior] = useState("");
  const [unsyncedCount, setUnsyncedCount] = useState(0);
  const [status, setStatus] = useState(navigator.onLine ? "Online" : "Offline");
  const navigate = useNavigate();

  // === Supabase auth state ===
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      if (data.user) navigate("/dashboard");
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) navigate("/dashboard");
    });

    return () => sub.subscription.unsubscribe();
  }, [navigate]);

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
        <AuthPanel />
      </div>
    );
  }

  // === Temporary fallback dashboard (for older route) ===
  return (
    <Dashboard
      user={user}
      status={status}
      onSave={handleSave}
      unsyncedCount={unsyncedCount}
      behavior={behavior}
      setBehavior={setBehavior}
    />
  );
}
