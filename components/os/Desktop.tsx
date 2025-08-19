'use client';

import { useState } from 'react';
import { AppIcon } from './AppIcon';
import { Taskbar } from './Taskbar';
import { StartMenu } from './StartMenu';
import { ControlPanel } from './ControlPanel';
import { Window } from './Window';
import { useTheme } from '@/hooks/useTheme';

export interface App {
  id: string;
  name: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
}

export function Desktop() {
  const [apps, setApps] = useState<App[]>([
    { id: 'explorer', name: 'Explorateur de fichiers', icon: 'folder', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 100, y: 100 } },
    { id: 'settings', name: 'Paramètres', icon: 'settings', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 300, y: 100 } },
    { id: 'browser', name: 'Navigateur', icon: 'globe', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 500, y: 100 } },
    { id: 'terminal', name: 'Terminal', icon: 'terminal', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 700, y: 100 } },
  ]);
  
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);
  const [wallpaper, setWallpaper] = useState('/wallpaper.svg');
  const { theme, toggleTheme } = useTheme();

  const openApp = (appId: string) => {
    setApps(prev => prev.map(app => 
      app.id === appId 
        ? { ...app, isOpen: true, isMinimized: false, zIndex: Math.max(...prev.map(a => a.zIndex), 100) + 1 }
        : app
    ));
  };

  const closeApp = (appId: string) => {
    setApps(prev => prev.map(app => 
      app.id === appId ? { ...app, isOpen: false, isMinimized: false } : app
    ));
  };

  const minimizeApp = (appId: string) => {
    setApps(prev => prev.map(app => 
      app.id === appId ? { ...app, isMinimized: true } : app
    ));
  };

  const maximizeApp = (appId: string) => {
    setApps(prev => prev.map(app => 
      app.id === appId ? { ...app, isMaximized: !app.isMaximized } : app
    ));
  };

  const bringToFront = (appId: string) => {
    setApps(prev => prev.map(app => 
      app.id === appId 
        ? { ...app, zIndex: Math.max(...prev.map(a => a.zIndex), 100) + 1 }
        : app
    ));
  };

  const updateAppPosition = (appId: string, position: { x: number; y: number }) => {
    setApps(prev => prev.map(app => 
      app.id === appId ? { ...app, position } : app
    ));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 relative ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Image de fond d'écran */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${wallpaper})`,
        }}
      />
      
      {/* Overlay pour maintenir la lisibilité */}
      <div className={`absolute inset-0 ${
        theme === 'dark' 
          ? 'bg-black/40' 
          : 'bg-white/30'
      }`} />

      <div className="relative h-screen overflow-hidden z-10">
        {apps.map((app) => (
          <AppIcon
            key={app.id}
            app={app}
            onClick={() => openApp(app.id)}
            onPositionChange={(position: { x: number; y: number }) => updateAppPosition(app.id, position)}
            theme={theme}
          />
        ))}

        {apps.map((app) => app.isOpen && !app.isMinimized && (
          <Window
            key={app.id}
            app={app}
            onClose={() => closeApp(app.id)}
            onMinimize={() => minimizeApp(app.id)}
            onMaximize={() => maximizeApp(app.id)}
            onMouseDown={() => bringToFront(app.id)}
            theme={theme}
          />
        ))}

        <Taskbar
          apps={apps}
          onAppClick={(appId) => {
            const app = apps.find(a => a.id === appId);
            if (app?.isMinimized) {
              setApps(prev => prev.map(a => 
                a.id === appId ? { ...a, isMinimized: false } : a
              ));
            } else if (app?.isOpen) {
              bringToFront(appId);
            }
          }}
          onStartClick={() => setIsStartMenuOpen(true)}
          onControlPanelClick={() => setIsControlPanelOpen(true)}
          onThemeToggle={toggleTheme}
          theme={theme}
        />

        {isStartMenuOpen && (
          <StartMenu
            apps={apps}
            onAppClick={openApp}
            onClose={() => setIsStartMenuOpen(false)}
            theme={theme}
          />
        )}

        {isControlPanelOpen && (
          <ControlPanel
            onClose={() => setIsControlPanelOpen(false)}
            theme={theme}
          />
        )}
      </div>
    </div>
  );
}
