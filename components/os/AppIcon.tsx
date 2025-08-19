'use client';

import { LucideIcon, Folder, Settings, Globe, Terminal } from 'lucide-react';
import { App } from './Desktop';
import { motion, PanInfo } from 'framer-motion';

interface AppIconProps {
  app: App;
  onClick: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
  theme: 'light' | 'dark';
}

const iconMap: Record<string, LucideIcon> = {
  folder: Folder,
  settings: Settings,
  globe: Globe,
  terminal: Terminal,
};

export function AppIcon({ app, onClick, onPositionChange, theme }: AppIconProps) {
  const IconComponent = iconMap[app.icon] || Folder;

  const handleDragEnd = (event: any, info: PanInfo) => {
    let newX = app.position.x + info.offset.x;
    let newY = app.position.y + info.offset.y;
    
    // Empêcher les icônes de sortir de l'écran
    const maxX = window.innerWidth - 120; // Largeur de l'icône + padding
    const maxY = window.innerHeight - 120; // Hauteur de l'icône + padding
    
    newX = Math.max(20, Math.min(newX, maxX));
    newY = Math.max(20, Math.min(newY, maxY));
    
    onPositionChange({ x: newX, y: newY });
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={false}
      onDragEnd={handleDragEnd}
      initial={false}
      animate={false}
      style={{
        x: app.position.x,
        y: app.position.y,
        zIndex: 0,
      }}
      className={`absolute flex flex-col items-center justify-center p-4 rounded-xl cursor-move group ${
        theme === 'dark'
          ? 'hover:bg-white/10 text-white'
          : 'hover:bg-white/80 text-gray-700'
      }`}
      onDoubleClick={onClick}
    >
      <div className={`p-3 rounded-lg mb-2 ${
        theme === 'dark'
          ? 'bg-white/20 group-hover:bg-white/30'
          : 'bg-white/40 group-hover:bg-white/80'
      }`}>
        <IconComponent 
          size={32} 
          className={`${
            theme === 'dark' ? 'text-white' : 'text-gray-700'
          }`} 
        />
      </div>
      <span className={`text-sm font-medium text-center max-w-[80px] truncate ${
        theme === 'dark' ? 'text-white/90' : 'text-gray-700'
      }`}>
        {app.name}
      </span>
    </motion.div>
  );
}
