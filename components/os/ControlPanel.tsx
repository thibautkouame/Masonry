'use client';

import { useState } from 'react';
import { X, Monitor, Palette, Wifi, Shield, Download, Users, HardDrive } from 'lucide-react';

interface ControlPanelProps {
  onClose: () => void;
  theme: 'light' | 'dark';
}

interface SettingCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

export function ControlPanel({ onClose, theme }: ControlPanelProps) {
  const [activeCategory, setActiveCategory] = useState('system');

  const categories: SettingCategory[] = [
    {
      id: 'system',
      name: 'Système',
      icon: <Monitor size={20} />,
      description: 'Paramètres système et performances'
    },
    {
      id: 'personalization',
      name: 'Personnalisation',
      icon: <Palette size={20} />,
      description: 'Thèmes, couleurs et arrière-plans'
    },
    {
      id: 'network',
      name: 'Réseau',
      icon: <Wifi size={20} />,
      description: 'WiFi, Ethernet et connexions'
    },
    {
      id: 'security',
      name: 'Sécurité',
      icon: <Shield size={20} />,
      description: 'Pare-feu et protection'
    },
    {
      id: 'updates',
      name: 'Mises à jour',
      icon: <Download size={20} />,
      description: 'Mises à jour système'
    },
    {
      id: 'accounts',
      name: 'Comptes',
      icon: <Users size={20} />,
      description: 'Utilisateurs et famille'
    },
    {
      id: 'storage',
      name: 'Stockage',
      icon: <HardDrive size={20} />,
      description: 'Disques et espace'
    }
  ];

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'system':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <h4 className="font-medium">Mode de performance</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Équilibré</p>
              </div>
              <select className="p-2 border rounded-lg bg-white dark:bg-gray-700">
                <option>Équilibré</option>
                <option>Haute performance</option>
                <option>Économie d'énergie</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <h4 className="font-medium">Mémoire RAM</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">8 GB installés</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">6.2 GB utilisés</div>
                <div className="text-xs text-gray-500">77%</div>
              </div>
            </div>
          </div>
        );
      
      case 'personalization':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {['Bleu', 'Vert', 'Violet', 'Rouge', 'Orange', 'Jaune'].map((color) => (
                <button
                  key={color}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    color === 'Bleu' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full mx-auto mb-2 ${
                    color === 'Bleu' ? 'bg-blue-500' :
                    color === 'Vert' ? 'bg-green-500' :
                    color === 'Violet' ? 'bg-purple-500' :
                    color === 'Rouge' ? 'bg-red-500' :
                    color === 'Orange' ? 'bg-orange-500' : 'bg-yellow-500'
                  }`} />
                  <span className="text-sm font-medium">{color}</span>
                </button>
              ))}
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <h4 className="font-medium">Transparence</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Effets de transparence</p>
              </div>
              <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                <div className="w-5 h-5 bg-blue-600 rounded-full translate-x-6" />
              </div>
            </div>
          </div>
        );
      
      case 'network':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">WiFi</h4>
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Home_Network</p>
              <p className="text-xs text-gray-500">Signal excellent</p>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Ethernet</h4>
                <div className="w-3 h-3 bg-gray-400 rounded-full" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Non connecté</p>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-8 text-center text-gray-500">
            <p>Contenu en cours de développement</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      
      <div className={`relative w-4/5 max-w-4xl h-3/4 rounded-2xl shadow-2xl transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gray-900/95 backdrop-blur-md border border-gray-700/50'
          : 'bg-white/95 backdrop-blur-md border border-gray-200/50'
      }`}>
        <div className="flex h-full">
          <div className={`w-64 border-r ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="p-4">
              <h2 className={`text-xl font-semibold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Paramètres
              </h2>
              
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                      activeCategory === category.id
                        ? theme === 'dark'
                          ? 'bg-white/10 text-white'
                          : 'bg-blue-50 text-blue-700'
                        : theme === 'dark'
                          ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className={activeCategory === category.id ? 'text-blue-500' : ''}>
                      {category.icon}
                    </span>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className={`text-xs ${
                        activeCategory === category.id
                          ? theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                          : theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        {category.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {categories.find(c => c.id === activeCategory)?.name}
              </h3>
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
            
            <div className={`${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {renderCategoryContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
