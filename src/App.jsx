import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-400 via-sky-400 to-teal-400 dark:from-blue-800 dark:via-sky-800 dark:to-teal-800 text-white p-6">
      <div className="p-8 rounded-2xl shadow-xl bg-white/10 backdrop-blur-sm space-y-4 w-full max-w-md text-center">
        <h1 className="text-4xl font-extrabold text-white">Tailwind v4 Test</h1>

        {/* ✅ New opacity syntax */}
        <p className="text-white/70 text-lg">This text uses new <code>/70</code> opacity syntax.</p>

        {/* ✅ New ring behavior */}
        <input
          type="text"
          placeholder="Focus me"
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-3 focus:ring-emerald-400 transition-all"
        />

        {/* ✅ outline-hidden vs outline-none */}
        <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg outline-hidden">
          outline-hidden button
        </button>

        {/* ✅ ring with new width */}
        <button className="px-4 py-2 border border-white/30 text-white rounded-lg focus:ring-3 focus:ring-cyan-400">
          ring-3 focus effect
        </button>
      </div>
    </div>
  );
}

export default App
