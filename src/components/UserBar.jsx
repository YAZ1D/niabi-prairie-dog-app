import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function UserBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signOut = async () => { await supabase.auth.signOut(); };

  return (
    <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:12 }}>
      {user ? (
        <>
          <span>Signed in as {user.email}</span>
          <button onClick={signOut}>Sign out</button>
        </>
      ) : <span>Not signed in</span>}
    </div>
  );
}
