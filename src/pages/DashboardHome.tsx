export default function DashboardHome() {
  return (
    <div className="p-6 text-white space-y-6">
      <h1 className="text-3xl font-bold text-niabi-yellow">
        Niabi Observation Dashboard
      </h1>
      <p>
        Welcome to the Prairie Dog observation system.
        Use the sidebar to navigate to future sections such as:
      </p>

      <ul className="list-disc list-inside text-niabi-cream/80 space-y-1">
        <li>🕳️ Burrow Map (Habitat Visualization)</li>
        <li>📋 Behavior Logs (Observation Records)</li>
        <li>📈 Activity Trends (Charts)</li>
        <li>👥 Coterie Overview (Social Groups)</li>
      </ul>

      <p className="pt-4 text-sm text-niabi-cream/60">
        This dashboard will soon include real Supabase-connected data from the
        habitat.
      </p>
    </div>
  );
}
