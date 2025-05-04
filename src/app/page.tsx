'use client';
import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md p-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Badmus Qudus Ayomide </h1>
          <nav className="space-x-4">
            <a href="#about" className="hover:text-blue-500">About</a>
            <a href="#projects" className="hover:text-blue-500">Projects</a>
            <a href="#contact" className="hover:text-blue-500">Contact</a>
          </nav>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <p className="text-lg">
          I'm a passionate frontend developer with a love for building clean, user-friendly interfaces using React and Tailwind CSS.
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto py-16 px-4 bg-white">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Portfolio Website</h3>
            <p>A clean portfolio built with Next.js and Tailwind CSS.</p>
          </div>
          <div className="p-6 border rounded shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Todo App</h3>
            <p>Task manager with local storage support and responsive UI.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-4">Contact</h2>
        <p>Email me at: <a className="text-blue-500" href="mailto:you@example.com">me</a></p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-4">
        <p>&copy; {new Date().getFullYear()} Codestream </p>
      </footer>
    </main>
  );
}
