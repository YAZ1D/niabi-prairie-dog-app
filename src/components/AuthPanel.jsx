import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AuthPanel() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [remember, setRemember] = useState(true);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordsMatch = pw === confirmPw;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Auto sign-out when "Remember Me" is off
  const handleSignOutOnClose = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch {}
  }, []);

  useEffect(() => {
    if (!remember) {
      window.addEventListener('pagehide', handleSignOutOnClose);
      window.addEventListener('beforeunload', handleSignOutOnClose);
    } else {
      window.removeEventListener('pagehide', handleSignOutOnClose);
      window.removeEventListener('beforeunload', handleSignOutOnClose);
    }
    return () => {
      window.removeEventListener('pagehide', handleSignOutOnClose);
      window.removeEventListener('beforeunload', handleSignOutOnClose);
    };
  }, [remember, handleSignOutOnClose]);

  const go = async (e) => {
    e?.preventDefault?.();
    setMsg('');
    setLoading(true);

    try {
      // === Frontend validation ===
      if (!email) throw new Error('Email is required.');
      if (!emailValid) throw new Error('Please enter a valid email address.');
      if (!pw) throw new Error('Password is required.');

      if (mode === 'signup') {
        if (!passwordsMatch) throw new Error('Passwords do not match.');
        if (pw.length < 6)
          throw new Error('Password must be at least 6 characters long.');

        // Attempt signup
        const { data, error } = await supabase.auth.signUp({
          email,
          password: pw,
        });

        if (error) {
          // Detect duplicate account or other known Supabase errors
          if (
            error.message.includes('User already registered') ||
            error.message.includes('already exists')
          ) {
            throw new Error('An account with this email already exists.');
          }
          if (error.message.includes('rate limit')) {
            throw new Error(
              'Too many attempts. Please wait a few minutes and try again.'
            );
          }
          throw error;
        }

        // Detect case where Supabase silently returns an existing user
        if (data?.user?.identities?.length === 0) {
          throw new Error('This email is already registered.');
        }

        setMsg('✅ Account created. Please check your email to confirm.');
        setPw('');
        setConfirmPw('');
      } else {
        // === Sign in ===
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password: pw,
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            throw new Error('Incorrect email or password.');
          }
          if (error.message.includes('rate limit')) {
            throw new Error(
              'Too many attempts. Please wait a few minutes and try again.'
            );
          }
          throw error;
        }

        setMsg('✅ Signed in successfully.');
      }
    } catch (err) {
      setMsg(err?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative">
      {/* semi-transparent overlay */}
      <div aria-hidden className="absolute inset-0 bg-niabi-forest/40" />

      {/* ambient glow background */}
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-niabi-forest/40 via-niabi-deepnavy/30 to-niabi-emerald/30 opacity-70 animate-pulseSlow" />
      </div>

      {/* login card */}
      <div className="relative z-10 w-full max-w-xl rounded-3xl p-10 bg-niabi-deepnavy/60 backdrop-blur-md border border-niabi-yellow/20 shadow-2xl animate-fadeIn">
        <img
          src="/src/assets/logo-niabi.webp"
          alt="Niabi Zoo Logo"
          className="h-20 mx-auto mb-6 drop-shadow-lg"
        />

        <h1 className="text-3xl font-extrabold text-center text-niabi-yellow mb-2">
          Niabi Prairie Dog App
        </h1>
        <p className="text-gray-300 text-center mb-8">
          {mode === 'signin'
            ? 'Please sign in to begin logging observations.'
            : 'Create an account to start logging observations.'}
        </p>

        <div className="mx-auto w-full max-w-md">
          <form className="space-y-4" onSubmit={go}>
            {/* Email */}
            <label className="block text-left text-niabi-cream/80 text-sm">
              Email
              <input
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 w-full p-4 rounded-lg bg-black/20 border ${
                  email && !emailValid
                    ? 'border-red-500'
                    : 'border-niabi-forest'
                } text-niabi-cream placeholder-niabi-cream/60 focus:ring-2 focus:ring-niabi-emerald outline-none`}
              />
              {email && !emailValid && (
                <p className="text-sm text-red-400 mt-1">
                  Please enter a valid email.
                </p>
              )}
            </label>

            {/* Password */}
            <label className="block text-left text-niabi-cream/80 text-sm">
              Password
              <input
                type="password"
                placeholder="••••••••"
                required
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="mt-1 w-full p-4 rounded-lg bg-black/20 border border-niabi-forest text-niabi-cream placeholder-niabi-cream/60 focus:ring-2 focus:ring-niabi-emerald outline-none"
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              />
            </label>

            {/* Confirm Password (signup only) */}
            {mode === 'signup' && (
              <>
                <label className="block text-left text-niabi-cream/80 text-sm">
                  Confirm Password
                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    value={confirmPw}
                    onChange={(e) => setConfirmPw(e.target.value)}
                    className="mt-1 w-full p-4 rounded-lg bg-black/20 border border-niabi-forest text-niabi-cream placeholder-niabi-cream/60 focus:ring-2 focus:ring-niabi-emerald outline-none"
                    autoComplete="new-password"
                  />
                </label>
                {!passwordsMatch && confirmPw && (
                  <p className="text-sm text-yellow-300">
                    ⚠ Passwords do not match
                  </p>
                )}
              </>
            )}

            {/* Remember / Forgot password (signin only) */}
            {mode === 'signin' && (
              <div className="flex items-center justify-between text-sm text-niabi-cream">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-niabi-forest bg-black/20"
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={async () => {
                    try {
                      if (!email) return setMsg('Enter your email to reset.');
                      const { error } =
                        await supabase.auth.resetPasswordForEmail(email);
                      if (error) throw error;
                      setMsg(
                        '📧 Password reset email sent (if account exists).'
                      );
                    } catch (err) {
                      setMsg(err?.message || String(err));
                    }
                  }}
                  className="text-niabi-yellow hover:text-niabi-emerald transition"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={
                loading ||
                !emailValid ||
                !pw ||
                (mode === 'signup' && (!pw || !passwordsMatch))
              }
              className="w-full py-3 rounded-lg font-semibold bg-niabi-yellow text-niabi-deepnavy hover:brightness-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? 'Working…'
                : mode === 'signin'
                ? 'Sign In'
                : 'Create Account'}
            </button>

            {/* Switch mode */}
            <button
              type="button"
              onClick={() => {
                setMode((m) => (m === 'signin' ? 'signup' : 'signin'));
                setMsg('');
                setPw('');
                setConfirmPw('');
              }}
              className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-niabi-emerald to-niabi-forest text-niabi-cream hover:scale-105 transition-transform"
            >
              {mode === 'signin'
                ? 'Need an account? Create one'
                : 'Back to Sign In'}
            </button>
          </form>

          {msg && (
            <p className="text-center text-sm text-niabi-yellow mt-4 transition-all">
              {msg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
