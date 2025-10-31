import localforage from "localforage";

localforage.config({
  name: "NiabiPrairieDogApp",
  storeName: "observations"
});

// Save a new observation
export async function saveObservation(data) {
  const current = (await localforage.getItem("pending")) || [];
  current.push({ ...data, synced: false, timestamp: new Date().toISOString() });
  await localforage.setItem("pending", current);
  return current.length;
}

// Get all unsynced observations
export async function getPendingObservations() {
  return (await localforage.getItem("pending")) || [];
}

// Mark all synced
export async function clearSynced() {
  const items = await getPendingObservations();
  await localforage.setItem("pending", items.filter(i => !i.synced));
}
