'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signInWithCredentials } from 'actions/sign-in';
import { IFormData } from 'interfaces/IFormData';

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<IFormData>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signInWithCredentials(formData);
      
      if (result?.ok) {
        router.push('/');
      } else {
        setError('Ошибка при входе. Проверьте данные.');
      }
    } catch (error) {
      setError('Error signing in. Please try again.');
      console.error('Error signing in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-1">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-300">Sign in to your account</p>
        </div>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-xl">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-400/50 text-red-300 rounded-lg text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-white mb-1.5">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="you@example.com"
                required
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white outline-none transition focus:bg-white/20 focus:border-white/50 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-white mb-1.5">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white outline-none transition focus:bg-white/20 focus:border-white/50 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 rounded-lg text-sm text-white bg-blue-600/80 border border-blue-400/50 hover:bg-blue-600 hover:border-blue-300 transition duration-300 font-semibold cursor-pointer backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="px-2 text-xs text-gray-400">New here?</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Sign Up Link */}
          <Link
            href="/sign-up"
            className="block w-full px-4 py-2 rounded-lg text-sm text-white bg-white/10 border border-white/30 hover:bg-white/20 hover:border-white/50 transition duration-300 font-semibold cursor-pointer backdrop-blur-sm text-center"
          >
            Create Account
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition text-xs font-medium cursor-pointer">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
