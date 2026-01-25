'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ErrorPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center relative z-10">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
            500
          </h1>
        </div>

        {/* Error Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Oops! Something Went Wrong
        </h2>

        {/* Error Description */}
        <p className="text-lg text-slate-300 mb-8 max-w-md mx-auto">
          We encountered an unexpected error. Our team has been notified and we're working on fixing it.
        </p>

        {/* Error Icon */}
        <div className="mb-8">
          <svg
            className="w-20 h-20 mx-auto text-red-400 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105 cursor-pointer"
          >
            Go Back
          </button>
          <Link
            href="/"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105 inline-block cursor-pointer"
          >
            Back to Home
          </Link>
        </div>

        {/* Support Text */}
        <div className="mt-12">
          <p className="text-slate-400 text-sm">
            Need help?{' '}
            <Link
              href="/contacts"
              className="text-blue-400 hover:text-blue-300 font-semibold transition"
            >
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;