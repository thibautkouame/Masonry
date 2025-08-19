'use client';

import { useState } from 'react';
import { Search, X, Folder, Settings, Globe, Terminal, Power, User } from 'lucide-react';
import { App } from './Desktop';

interface StartMenuProps {
  apps: App[];
  onAppClick: (appId: string) => void;
  onClose: () => void;
  theme: 'light' | 'dark';
}

export function StartMenu({ apps, onAppClick, onClose, theme }: StartMenuProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedApps = apps.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pb-20">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      
      <div className={`relative w-96 max-h-[600px] rounded-t-2xl shadow-2xl transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gray-900/95 backdrop-blur-md border border-gray-700/50'
          : 'bg-white/95 backdrop-blur-md border border-gray-200/50'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Menu Démarrer
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-white/10 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <X size={20} />
            </button>
          </div>

          <div className={`relative mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              }`}
            />
          </div>

          {searchQuery && (
            <div className="mb-6">
              <h3 className={`text-sm font-medium mb-3 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Résultats de recherche
              </h3>
              <div className="space-y-2">
                {filteredApps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      onAppClick(app.id);
                      onClose();
                    }}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      theme === 'dark'
                        ? 'hover:bg-white/10 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      theme === 'dark' ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      {app.icon === 'folder' && <Folder size={20} />}
                      {app.icon === 'settings' && <Settings size={20} />}
                      {app.icon === 'globe' && <Globe size={20} />}
                      {app.icon === 'terminal' && <Terminal size={20} />}
                    </div>
                    <span className="font-medium">{app.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className={`text-sm font-medium mb-3 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Applications épinglées
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {pinnedApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    onAppClick(app.id);
                    onClose();
                  }}
                  className={`flex flex-col items-center p-4 rounded-xl transition-all duration-200 hover:scale-105 ${
                    theme === 'dark'
                      ? 'hover:bg-white/10 text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className={`p-3 rounded-lg mb-2 ${
                    theme === 'dark' ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                    {app.icon === 'folder' && <Folder size={24} />}
                    {app.icon === 'settings' && <Settings size={24} />}
                    {app.icon === 'globe' && <Globe size={24} />}
                    {app.icon === 'terminal' && <Terminal size={24} />}
                  </div>
                  <span className="text-sm font-medium text-center">{app.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'hover:bg-white/10 text-white'
                : 'hover:bg-gray-100 text-gray-700'
            }`}>
              <User size={20} />
              <span className="text-sm font-medium">Profil</span>
            </button>
            
            <button className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'hover:bg-white/10 text-white'
                : 'hover:bg-gray-100 text-gray-700'
            }`}>
              <Power size={20} />
              <span className="text-sm font-medium">Arrêter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
