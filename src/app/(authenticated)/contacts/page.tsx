'use client';

import { useState } from 'react';
import Link from 'next/link';

const ContactsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300">
            Have questions? We'd love to hear from you. Send us a message!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Email */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition border border-white/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                    <a href="mailto:contact@liubinski.dev" className="text-blue-400 hover:text-blue-300 transition">
                      contact@liubinski.dev
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition border border-white/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Location</h3>
                    <p className="text-gray-300">
                      Belarus
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition border border-white/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 00.502.756l2.04 1.084a9 9 0 01-5.514 5.514l-1.084-2.04a1 1 0 00-.756-.502L5.677 9.228A1 1 0 005.004 8.28L1.684 5.28A2 2 0 013 5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Phone</h3>
                    <a href="tel:+375292000000" className="text-blue-400 hover:text-blue-300 transition">
                      +375 (29) 200-00-00
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Follow Me</h3>
                <div className="flex gap-3">
                  <a href="#" className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition cursor-pointer">
                    <span className="text-lg">f</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition cursor-pointer">
                    <span className="text-lg">𝕏</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition cursor-pointer">
                    <span className="text-lg">in</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 lg:p-12 border border-white/20">
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-400/50 text-green-300 rounded-lg">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {/* Name Field */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white outline-none transition duration-300 focus:bg-white/20 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />
              </div>

              {/* Email Field */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white outline-none transition duration-300 focus:bg-white/20 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />
              </div>

              {/* Subject Field */}
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-semibold text-white mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white outline-none transition duration-300 focus:bg-white/20 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />
              </div>

              {/* Message Field */}
              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={5}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white outline-none transition duration-300 focus:bg-white/20 focus:ring-2 focus:ring-blue-500 placeholder-gray-400 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition duration-300 font-semibold shadow-lg hover:shadow-xl cursor-pointer"
              >
                Send Message
              </button>

              {/* Back Link */}
              <div className="mt-6 text-center">
                <Link href="/" className="text-blue-400 hover:text-blue-300 transition text-sm font-medium cursor-pointer">
                  ← Back to Home
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactsPage;