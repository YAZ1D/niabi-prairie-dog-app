import { useState, useEffect } from "react";
import { saveObservation } from "./data/storage";
import "./App.css";

console.log("✅ USING NEW App.jsx");


function App() {
  const [behavior, setBehavior] = useState("");
  const [unsyncedCount, setUnsyncedCount] = useState(0);
  const [status, setStatus] = useState(navigator.onLine ? "Online" : "Offline");

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

  async function handleSave() {
    const total = await saveObservation({ behavior });
    setUnsyncedCount(total);
    setBehavior("");
  }

  return (
    <div className="App" style={{ padding: "20px", textAlign: "center" }}>
      <h1>Niabi Prairie Dog Observation App</h1>
      <p>Status: <strong style={{ color: status === "Online" ? "green" : "red" }}>{status}</strong></p>

      <input
        type="text"
        placeholder="Enter observed behavior"
        value={behavior}
        onChange={(e) => setBehavior(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />
      <button onClick={handleSave}>Save Observation (Offline)</button>

      <p style={{ marginTop: "20px" }}>
        <strong>{unsyncedCount}</strong> unsynced records saved locally
      </p>
    </div>
  );
}

export default App
