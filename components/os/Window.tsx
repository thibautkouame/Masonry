'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Minus, Square, Maximize2, Monitor, HardDrive, BookOpen, Image, Music, Video } from 'lucide-react';
import { App } from './Desktop';

interface WindowProps {
  app: App;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onMouseDown: () => void;
  theme: 'light' | 'dark';
}

export function Window({ 
  app, 
  onClose, 
  onMinimize, 
  onMaximize, 
  onMouseDown, 
  theme 
}: WindowProps) {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 400, height: 500 });
  const windowRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const isResizingRef = useRef(false);
  const resizeDirectionRef = useRef<string>('');
  const initialSizeRef = useRef({ width: 400, height: 500 });
  const initialPositionRef = useRef({ x: 100, y: 100 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === windowRef.current || (e.target as HTMLElement).closest('.window-header')) {
      isDraggingRef.current = true;
      const rect = windowRef.current?.getBoundingClientRect();
      if (rect) {
        dragOffsetRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
      onMouseDown();
      
      const handleMouseMove = (e: MouseEvent) => {
        if (isDraggingRef.current) {
          requestAnimationFrame(() => {
            setPosition({
              x: e.clientX - dragOffsetRef.current.x,
              y: e.clientY - dragOffsetRef.current.y
            });
          });
        }
      };

      const handleMouseUp = () => {
        isDraggingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  // Réinitialiser la taille et position quand la fenêtre est restaurée
  useEffect(() => {
    if (!app.isMaximized) {
      setSize({ width: 400, height: 500 });
      setPosition({ x: 100, y: 100 });
    }
  }, [app.isMaximized]);

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    isResizingRef.current = true;
    resizeDirectionRef.current = direction;
    initialSizeRef.current = { ...size };
    initialPositionRef.current = { ...position };
    
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingRef.current) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        requestAnimationFrame(() => {
          let newWidth = initialSizeRef.current.width;
          let newHeight = initialSizeRef.current.height;
          let newX = initialPositionRef.current.x;
          let newY = initialPositionRef.current.y;

          if (direction.includes('e')) {
            newWidth = Math.max(300, initialSizeRef.current.width + deltaX);
          }
          if (direction.includes('w')) {
            const maxDelta = initialSizeRef.current.width - 300;
            const actualDelta = Math.min(deltaX, maxDelta);
            newWidth = Math.max(300, initialSizeRef.current.width - actualDelta);
            newX = initialPositionRef.current.x + actualDelta;
          }
          if (direction.includes('s')) {
            newHeight = Math.max(200, initialSizeRef.current.height + deltaY);
          }
          if (direction.includes('n')) {
            const maxDelta = initialSizeRef.current.height - 200;
            const actualDelta = Math.min(deltaY, maxDelta);
            newHeight = Math.max(200, initialSizeRef.current.height - actualDelta);
            newY = initialPositionRef.current.y + actualDelta;
          }

          setSize({ width: newWidth, height: newHeight });
          setPosition({ x: newX, y: newY });
        });
      }
    };

    const handleMouseUp = () => {
      isResizingRef.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const getWindowContent = () => {
    switch (app.id) {
      case 'explorer':
        return (
          <div className="h-full flex flex-col">
            {/* Barre d'outils */}
            <div className={`flex items-center space-x-2 p-3 ${
              theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
            }`}>
              <button className={`p-2 rounded ${
                theme === 'dark' ? 'text-white' : 'text-gray-700'
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button className={`p-2 rounded ${
                theme === 'dark' ? 'text-white' : 'text-gray-700'
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </button>
              <button className={`p-2 rounded ${
                theme === 'dark' ? 'text-white' : 'text-gray-700'
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />
              <button className={`p-2 rounded ${
                theme === 'dark' ? 'text-white' : 'text-gray-700'
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                </svg>
              </button>
            </div>

            {/* Barre d'adresse */}
            <div className={`flex items-center space-x-2 p-2 border-b ${
              theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
            }`}>
              <button className={`p-1 rounded ${
                theme === 'dark' ? 'text-white' : 'text-gray-700'
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className={`p-1 rounded ${
                theme === 'dark' ? 'text-white' : 'text-gray-700'
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className={`flex-1 px-3 py-1 rounded border ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}>
                Ce PC &gt; Disque local (C:) &gt; Utilisateurs &gt; KOUAME BOSSON BADOU THIBAUT
              </div>
            </div>

            <div className="flex-1 flex bg-red-500">
              {/* Barre latérale */}
              <div className={`w-48 border-r p-3 bg-green-500 ${
                theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="space-y-2">
                  <div className={`flex items-center space-x-2 p-2 rounded hover:bg-white/10 cursor-pointer ${
                    theme === 'dark' ? 'text-white' : 'text-gray-700'
                  }`}>
                    <Monitor size={16} />
                    <span className="text-sm">Ce PC</span>
                  </div>
                  <div className={`flex items-center space-x-2 p-2 rounded hover:bg-white/10 cursor-pointer ${
                    theme === 'dark' ? 'text-white' : 'text-gray-700'
                  }`}>
                    <BookOpen size={16} />
                    <span className="text-sm">Documents</span>
                  </div>
                  <div className={`flex items-center space-x-2 p-2 rounded hover:bg-white/10 cursor-pointer ${
                    theme === 'dark' ? 'text-white' : 'text-gray-700'
                  }`}>
                    <Image size={16} />
                    <span className="text-sm">Images</span>
                  </div>
                  <div className={`flex items-center space-x-2 p-2 rounded hover:bg-white/10 cursor-pointer ${
                    theme === 'dark' ? 'text-white' : 'text-gray-700'
                  }`}>
                    <Music size={16} />
                    <span className="text-sm">Musique</span>
                  </div>
                  <div className={`flex items-center space-x-2 p-2 rounded hover:bg-white/10 cursor-pointer ${
                    theme === 'dark' ? 'text-white' : 'text-gray-700'
                  }`}>
                    <Video size={16} />
                    <span className="text-sm">Vidéos</span>
                  </div>
                </div>
              </div>

              {/* Zone principale des fichiers */}
              <div className="flex-1 p-4">
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { name: 'Documents', icon: '📄', type: 'Dossier' },
                    { name: 'Images', icon: '🖼️', type: 'Dossier' },
                    { name: 'Musique', icon: '🎵', type: 'Dossier' },
                    { name: 'Vidéos', icon: '🎬', type: 'Dossier' },
                    { name: 'Téléchargements', icon: '⬇️', type: 'Dossier' },
                    { name: 'Bureau', icon: '🖥️', type: 'Dossier' },
                    { name: 'Favoris', icon: '⭐', type: 'Dossier' },
                    { name: 'OneDrive', icon: '☁️', type: 'Dossier' }
                  ].map((item) => (
                    <div key={item.name} className={`text-center p-3 bg-red-500 rounded-lg hover:bg-white/10 cursor-pointer transition-colors ${
                      theme === 'dark' ? 'text-white' : 'text-gray-700'
                    }`}>
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {item.type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Paramètres</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Mode sombre</span>
                <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                  <div className={`w-5 h-5 rounded-full transition-all ${
                    theme === 'dark' ? 'bg-blue-600 translate-x-6' : 'bg-white translate-x-0'
                  }`} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Notifications</span>
                <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                  <div className="w-5 h-5 bg-blue-600 rounded-full translate-x-6" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'browser':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Navigateur</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Rechercher sur le web..."
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <div className="grid grid-cols-3 gap-4">
                {['Google', 'YouTube', 'Wikipedia'].map((site) => (
                  <div key={site} className="text-center p-3 bg-gray-100 rounded-lg">
                    <span className="text-sm font-medium">{site}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'terminal':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Terminal</h3>
            <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
              <div>$ ls -la</div>
              <div>total 8</div>
              <div>drwxr-xr-x 2 user user 4096 Jan 1 12:00 .</div>
              <div>drwxr-xr-x 3 user user 4096 Jan 1 12:00 ..</div>
              <div>$ _</div>
            </div>
          </div>
        );
      default:
        return <div className="p-6">Contenu de l'application</div>;
    }
  };

  return (
    <div
      ref={windowRef}
      className={`absolute ${
        app.isMaximized ? 'inset-4' : ''
      }`}
      style={{
        left: app.isMaximized ? undefined : position.x,
        top: app.isMaximized ? undefined : position.y,
        width: app.isMaximized ? undefined : size.width,
        height: app.isMaximized ? undefined : size.height,
        zIndex: app.zIndex
      }}
      onMouseDown={handleMouseDown}
    >
      <div className={`h-full rounded-xl shadow-2xl border relative ${
        theme === 'dark'
          ? 'bg-gray-900/95 backdrop-blur-md border-gray-700/50'
          : 'bg-white/95 backdrop-blur-md border-gray-200/50'
      }`}>
        {/* Poignées de redimensionnement */}
        <div 
          className="absolute top-0 left-0 w-2 h-2 cursor-nw-resize bg-transparent hover:bg-blue-400/50 rounded-full"
          onMouseDown={(e) => handleResizeStart(e, 'nw')}
        />
        <div 
          className="absolute top-0 right-0 w-2 h-2 cursor-ne-resize bg-transparent hover:bg-blue-400/50 rounded-full"
          onMouseDown={(e) => handleResizeStart(e, 'ne')}
        />
        <div 
          className="absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize bg-transparent hover:bg-blue-400/50 rounded-full"
          onMouseDown={(e) => handleResizeStart(e, 'sw')}
        />
        <div 
          className="absolute bottom-0 right-0 w-2 h-2 cursor-se-resize bg-transparent hover:bg-blue-400/50 rounded-full"
          onMouseDown={(e) => handleResizeStart(e, 'se')}
        />
        
        {/* Bords de redimensionnement */}
        <div 
          className="absolute top-0 left-2 right-2 h-1 cursor-n-resize bg-transparent hover:bg-blue-400/30"
          onMouseDown={(e) => handleResizeStart(e, 'n')}
        />
        <div 
          className="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize bg-transparent hover:bg-blue-400/30"
          onMouseDown={(e) => handleResizeStart(e, 's')}
        />
        <div 
          className="absolute left-0 top-2 bottom-2 w-1 cursor-w-resize bg-transparent hover:bg-blue-400/30"
          onMouseDown={(e) => handleResizeStart(e, 'w')}
        />
        <div 
          className="absolute right-0 top-2 bottom-2 w-1 cursor-e-resize bg-transparent hover:bg-blue-400/30"
          onMouseDown={(e) => handleResizeStart(e, 'e')}
        />
        <div className={`window-header flex items-center justify-between p-3 rounded-t-xl cursor-move ${
          theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/50'
        }`}>
          <div className={`flex items-center space-x-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-700'
          }`}>
            <span className="text-sm font-medium">{app.name}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={onMinimize}
              className={`p-1.5 rounded ${
                theme === 'dark'
                  ? 'hover:bg-white/10 text-white'
                  : 'hover:bg-gray-200 text-gray-700'
              }`}
            >
              <Minus size={16} />
            </button>
            
            <button
              onClick={onMaximize}
              className={`p-1.5 rounded ${
                theme === 'dark'
                  ? 'hover:bg-white/10 text-white'
                  : 'hover:bg-gray-200 text-gray-700'
              }`}
            >
              {app.isMaximized ? <Square size={16} /> : <Maximize2 size={16} />}
            </button>
            
            <button
              onClick={onClose}
              className={`p-1.5 rounded ${
                theme === 'dark'
                  ? 'hover:bg-white/10 text-white'
                  : 'hover:bg-red-100 text-red-600'
              }`}
            >
              <X size={16} />
            </button>
          </div>
        </div>
        
        <div className={`flex-1 overflow-auto ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          <div className="bg-green-500 bg-white ">
            {getWindowContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
