'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { registerUser } from 'actions/register';
import { IFormData } from 'interfaces/IFormData';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<IFormData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    const result = await registerUser(formData);

    if (result && 'error' in result) {
      setError(result.error);
      setIsLoading(false);
    } else {
      // Auto signed in - redirect immediately
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Create Account</h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-2 rounded-lg mb-4 text-sm">
            Account created successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-200 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-gray-200 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password || ''}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-semibold text-gray-200 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword || ''}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition-colors text-sm"
          >
            {isLoading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 space-y-2 text-center text-sm">
          <p className="text-gray-300">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-blue-400 hover:text-blue-300 font-semibold">
              Sign In
            </Link>
          </p>
          <Link href="/" className="text-gray-400 hover:text-gray-300 text-xs">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
