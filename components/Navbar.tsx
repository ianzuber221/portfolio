'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-900 text-white flex gap-6">
      <Link href="/" className="hover:underline">Home</Link>
      <Link href="/projects" className="hover:underline">Projects</Link>
      <Link href="/chat" className="hover:underline">AI Assistant</Link>
      <Link href="/about" className="hover:underline">About</Link>
    </nav>
  );
}