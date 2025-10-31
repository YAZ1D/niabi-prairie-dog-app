import { getPendingObservations, clearSynced } from "./storage.js";

export async function trySync() {
  if (!navigator.onLine) return; // only sync when online

  const pending = await getPendingObservations();
  if (pending.length === 0) return;

  for (const obs of pending) {
    try {
      await fetch("http://192.168.1.20:5000/api/sync", { // example local zoo server
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obs)
      });
      obs.synced = true;
    } catch (err) {
      console.warn("Sync failed, will retry later:", err);
    }
  }

  await clearSynced();
}

window.addEventListener("online", trySync);
