import { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="min-w-[350px] p-4 bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-bold">S</span>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Sahibinden Manager
          </h1>
        </div>
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50" />
      </header>

      <main className="space-y-4">
        <section className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">İstatistikler</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <p className="text-xs text-slate-500">Yoksayılanlar</p>
              <p className="text-xl font-bold text-indigo-400">0</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <p className="text-xs text-slate-500">İncelenenler</p>
              <p className="text-xl font-bold text-purple-400">0</p>
            </div>
          </div>
        </section>

        <section className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Hızlı Ayarlar</h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between group cursor-pointer">
              <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Otomatik Gizle</span>
              <div className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </div>
            </label>
            <label className="flex items-center justify-between group cursor-pointer">
              <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Fotoğraf İndirici</span>
              <div className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </div>
            </label>
          </div>
        </section>
      </main>

      <footer className="mt-6 pt-4 border-t border-slate-800/50 flex justify-center">
        <button className="text-xs text-slate-500 hover:text-indigo-400 transition-colors flex items-center gap-1">
          <span>Gelişmiş Ayarlar</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </footer>
    </div>
  );
}

export default App;
