'use client';

import { User, Settings, Sun, Moon, Wifi, BatteryFull, Volume2, Bell, LayoutGrid } from 'lucide-react';
import { App } from './Desktop';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskbarProps {
  apps: App[];
  onAppClick: (appId: string) => void;
  onStartClick: () => void;
  onControlPanelClick: () => void;
  onThemeToggle: () => void;
  theme: 'light' | 'dark';
}

export function Taskbar({
  apps,
  onAppClick,
  onStartClick,
  onControlPanelClick,
  onThemeToggle,
  theme
}: TaskbarProps) {
  const openApps = apps.filter(app => app.isOpen);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState<boolean | null>(null);
  const [connectionType, setConnectionType] = useState<string | null>(null);
  const [downlinkSpeed, setDownlinkSpeed] = useState<number | null>(null);
  const [showStartMenu, setShowStartMenu] = useState(false);



  useEffect(() => {
    // Vérifier si la méthode getBattery existe dans le navigateur
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setBatteryLevel(battery.level * 100); // Convertir en pourcentage
        setIsCharging(battery.charging);

        // Mettre à jour les informations lorsque l'état change
        battery.addEventListener('chargingchange', () => {
          setIsCharging(battery.charging);
        });
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(battery.level * 100);
        });
      });
    }

    if ('connection' in navigator) {
      const connection = navigator.connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;

      // Obtenez des informations sur le type de connexion (Wi-Fi, 4G, etc.)
      setConnectionType(connection.effectiveType);

      // Obtenez la vitesse de téléchargement en Mbit/s
      setDownlinkSpeed(connection.downlink);

      // Mettre à jour les informations lorsque la connexion change
      connection.addEventListener('change', () => {
        setConnectionType(connection.effectiveType);
        setDownlinkSpeed(connection.downlink);
      });
    }

    // Fermer le menu en cliquant à l'extérieur
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.start-menu-container')) {
        setShowStartMenu(false);
      }
    };

    if (showStartMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showStartMenu]);

  return (

    <div className={`fixed bottom-0 left-0 right-0 h-18 transition-all duration-300 z-50 ${theme === 'dark'
        ? 'bg-gray-900/90 backdrop-blur-md border-t border-gray-700/50'
        : 'bg-white/90 backdrop-blur-md border-t border-gray-200/50'
      }`}>
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center space-x-2">
          {/* <button
            onClick={onStartClick}
            className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
              theme === 'dark'
                ? 'hover:bg-white/10 text-white'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <User size={24} />
          </button> */}

          <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-2" />

          <button
            onClick={onControlPanelClick}
            className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 ${theme === 'dark'
                ? 'hover:bg-white/10 text-white'
                : 'hover:bg-gray-100 text-gray-700'
              }`}
          >
            <Settings size={20} />
          </button>
        </div>

                <div className="flex-1 flex items-center justify-center">
          {/* Applications ouvertes - positionnées à gauche de la barre de recherche */}
          <div className="flex items-center space-x-3 overflow-x-auto px-4 mr-8">
            {openApps.length === 0 ? (
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Aucune application ouverte
              </div>
            ) : (
              openApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => onAppClick(app.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 relative flex-shrink-0 ${
                    app.isMinimized
                      ? theme === 'dark'
                        ? 'bg-white/20 text-white'
                        : 'bg-blue-100 text-blue-700'
                      : theme === 'dark'
                        ? 'bg-white/10 text-white hover:bg-white/20'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    {app.icon === 'folder' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    )}
                    {app.icon === 'settings' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                    {app.icon === 'globe' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {app.icon === 'terminal' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs font-medium whitespace-nowrap">{app.name}</span>
                  
                  {/* Indicateur d'état */}
                  {app.isMinimized && (
                    <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                      theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'
                    }`} />
                  )}
                  
                  {/* Indicateur d'application active */}
                  {!app.isMinimized && app.zIndex > 100 && (
                    <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                      theme === 'dark' ? 'bg-green-400' : 'bg-green-500'
                    }`} />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
          {/* Bar de recherche */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center start-menu-container z-20">
          <div className="flex items-center space-x-3 bg-white border-1 border-[#EEEEEE] rounded-full px-4 py-2 w-80 h-14 shadow-lg">

            <motion.div
              className="flex items-center justify-center bg-blue-500 rounded-xl w-10 h-10 hover:bg-blue-600 cursor-pointer"
              onClick={() => setShowStartMenu(!showStartMenu)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: showStartMenu ? 1.1 : 1,
                boxShadow: showStartMenu ? "0 10px 25px rgba(0,0,0,0.2)" : "0 4px 6px rgba(0,0,0,0.1)"
              }}
              transition={{ type: "spring", stiffness: 600, damping: 30 }}
            >
              <motion.div
                animate={{ rotate: showStartMenu ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <LayoutGrid size={16} className="text-white h-5 w-5" />
              </motion.div>
            </motion.div>
            <input placeholder="Rechercher..." className="w-64 outline-none focus:outline-none focus:ring-0 focus:border-none" />
          </div>

          {/* Start Menu */}
          <AnimatePresence>
            {showStartMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 35,
                  duration: 0.15
                }}
                                 className={`absolute bottom-full mb-2 left-0 w-80 rounded-lg shadow-lg border z-50 ${theme === 'dark'
                   ? 'bg-gray-800 border-gray-700'
                   : 'bg-white border-gray-200'
                 }`}
              >
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05, duration: 0.15 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`text-center p-3 rounded-lg cursor-pointer ${theme === 'dark'
                          ? 'hover:bg-gray-700 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                        }`}
                    >
                      <motion.div
                        className="w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-2 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 600, damping: 20 }}
                      >
                        <User size={24} className="text-white" />
                      </motion.div>
                      <span className="text-xs">Profil</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08, duration: 0.15 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`text-center p-3 rounded-lg cursor-pointer ${theme === 'dark'
                          ? 'hover:bg-gray-700 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                        }`}
                    >
                      <motion.div
                        className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-2 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 600, damping: 20 }}
                      >
                        <Settings size={24} className="text-white" />
                      </motion.div>
                      <span className="text-xs">Paramètres</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.11, duration: 0.15 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`text-center p-3 rounded-lg cursor-pointer ${theme === 'dark'
                          ? 'hover:bg-gray-700 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                        }`}
                    >
                      <motion.div
                        className="w-12 h-12 bg-purple-500 rounded-lg mx-auto mb-2 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 600, damping: 20 }}
                      >
                        <Bell size={24} className="text-white" />
                      </motion.div>
                      <span className="text-xs">Notifications</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.14, duration: 0.15 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`text-center p-3 rounded-lg cursor-pointer ${theme === 'dark'
                          ? 'hover:bg-gray-700 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                        }`}
                    >
                      <motion.div
                        className="w-12 h-12 bg-orange-500 rounded-lg mx-auto mb-2 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 600, damping: 20 }}
                      >
                        <Wifi size={24} className="text-white" />
                      </motion.div>
                      <span className="text-xs">Réseau</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.17, duration: 0.15 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`text-center p-3 rounded-lg cursor-pointer ${theme === 'dark'
                          ? 'hover:bg-gray-700 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                        }`}
                    >
                      <motion.div
                        className="w-12 h-12 bg-red-500 rounded-lg mx-auto mb-2 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 600, damping: 20 }}
                      >
                        <BatteryFull size={24} className="text-white" />
                      </motion.div>
                      <span className="text-xs">Batterie</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.15 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`text-center p-3 rounded-lg cursor-pointer ${theme === 'dark'
                          ? 'hover:bg-gray-700 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                        }`}
                    >
                      <motion.div
                        className="w-12 h-12 bg-indigo-500 rounded-lg mx-auto mb-2 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 600, damping: 20 }}
                      >
                        <Volume2 size={24} className="text-white" />
                      </motion.div>
                      <span className="text-xs">Audio</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 hover:scale-105 ${theme === 'dark'
              ? 'text-white hover:bg-white/10'
              : 'text-gray-700 hover:bg-gray-100'
            }`}>
            <Wifi size={16} />
          </div>

          <div className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 hover:scale-105 ${theme === 'dark'
              ? 'text-white hover:bg-white/10'
              : 'text-gray-700 hover:bg-gray-100'
            }`}>
            <BatteryFull size={16} /> <span className="text-xs">{batteryLevel}%</span>
            {/* <p>Type de connexion : {connectionType}</p>
            <p>Vitesse de téléchargement : {downlinkSpeed ? downlinkSpeed + ' Mbit/s' : 'Inconnue'}</p> */}
          </div>

          <div className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 hover:scale-105 ${theme === 'dark'
              ? 'text-white hover:bg-white/10'
              : 'text-gray-700 hover:bg-gray-100'
            }`}>
            <Volume2 size={16} />
          </div>

          {typeof window !== 'undefined' && (
            <div className={`flex flex-col items-end px-2 transition-all duration-200 hover:scale-105 rounded-lg p-1 ${theme === 'dark'
                ? 'hover:bg-white/10'
                : 'hover:bg-gray-100'
              }`}>
              <span className={`text-xs font-mono leading-none ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className={`text-[10px] font-mono leading-none ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                {new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              </span>
            </div>
          )}

          <button
            onClick={onThemeToggle}
            className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 ${theme === 'dark'
                ? 'hover:bg-white/10 text-white'
                : 'hover:bg-gray-100 text-gray-700'
              }`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button className={`relative p-2 rounded-lg transition-all duration-200 hover:scale-105 ${theme === 'dark'
              ? 'text-white hover:bg-white/10'
              : 'text-gray-700 hover:bg-gray-100'
            }`}>
            <Bell size={16} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              2
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
