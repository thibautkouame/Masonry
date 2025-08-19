import React from 'react';
import Announcement from './seraui/announcement';
import { ArrowRightIcon, ArrowUpRightIcon, CommandIcon, ContactIcon, GithubIcon, HomeIcon, Link, SearchIcon, Zap } from 'lucide-react';
import { Button } from './ui/button';
import Search from '@/components/ui/search';
import { Input } from './ui/input';
import GlowCard from './ui/spotlight-card';
import Image from 'next/image';
export default function Masonry() {
  return (
    <div className="min-h-screen w-full bg-black relative flex flex-col items-center">
      {/* Crimson Core Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), radial-gradient(68% 58% at 50% 50%, #c81e3a 0%, #a51d35 16%, #7d1a2f 32%, #591828 46%, #3c1722 60%, #2a151d 72%, #1f1317 84%, #141013 94%, #0a0a0a 100%), radial-gradient(90% 75% at 50% 50%, rgba(228,42,66,0.06) 0%, rgba(228,42,66,0) 55%), radial-gradient(150% 120% at 8% 8%, rgba(0,0,0,0) 42%, #0b0a0a 82%, #070707 100%), radial-gradient(150% 120% at 92% 92%, rgba(0,0,0,0) 42%, #0b0a0a 82%, #070707 100%), radial-gradient(60% 50% at 50% 60%, rgba(240,60,80,0.06), rgba(0,0,0,0) 60%), #050505",
        }}
      />
      {/* Soft vignette to blend edges */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)",
          opacity: 0.95,
        }}
      />
      <section className='w-full h-full flex flex-col items-center p-10 bg-red-500/5 gap-8'>
        <Navbar />
        <div className="relative z-10 pt-35 flex flex-col items-center gap-6">
          <h1 className='text-white text-center text-4xl font-bold'>Masonry</h1>
          <div className='flex flex-col items-center gap-4 hover:scale-105 transition-all duration-300'>
            <div className='bg-black/60 backdrop-blur-sm border-1 border-white/50 rounded-full p-3 w-auto flex items-center justify-center gap-2'>
              <span className='bg-green-500 rounded-full w-1 h-1 box-shadow-lg animate-ping'></span>
              <h6 className='text-white text-center text-sm'>Get our latest discoveries</h6>
              <Zap className='w-3 h-3 text-orange-500' />
              <h6 className='text-white text-center text-sm'>Learn more</h6>
              <ArrowRightIcon className='w-3 h-3 text-white' />
            </div>
          </div>
          <div className='flex flex-col items-center gap-4 w-1/2'>
            <h1 className='text-white text-center text-6xl font-bold'>All the most important React frontend Libraries in one place.</h1>
            <p className='text-white/80 text-center text-[15px]'>The most popular frontend libraries for React, offering impressive, modern, and elegant web rendering. All in one place. Have fun coding!
            </p>
            <div className='flex flex-row items-center justify-center gap-4'>
              <Button variant="ghost" className='bg-white cursor-pointer border-[0.5px] backdrop-blur-sm border-white/20 text-black px-4 py-2 h-10 rounded-xl transition-colors w-full'>
                <GithubIcon className='w-4 h-4 text-black' /> <h6 className='text-black text-center text-sm'>Contribute </h6>
              </Button>
              <Button variant="ghost" className='bg-black/20 cursor-pointer hover:bg-red-500/5 border-[0.5px] backdrop-blur-sm border-white/20 text-white px-4 py-2 h-10 rounded-xl transition-colors w-full'>
                <h6 className='text-white text-center text-sm'>Get started <ArrowUpRightIcon className='w-4 h-4 text-white inline-block' /></h6>
              </Button>
            </div>
          </div>
        </div>
        {/* Libraries list */}
        <div className='flex flex-col gap-8 z-10 relative'>
          <h1 className='text-white text-left text-2xl font-bold'>Libraries</h1>
          {/* <div className="relative p-px rounded-2xl bg-gradient-to-r from-orange-500 via-purple-600 to-pink-600 shadow-lg shadow-purple-500/20 dark:shadow-purple-600/30 transition-shadow duration-300 hover:shadow-purple-500/40 dark:hover:shadow-purple-600/50 focus-within:shadow-purple-500/40 dark:focus-within:shadow-purple-600/50">
              <div className="flex items-center w-full px-4 py-2 bg-white/80 dark:bg-gray-900/90 rounded-[15px]">
                  <SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  <input
                      ref={null as any}
                      type="text"
                      placeholder="Type somthing here..."
                      value=""
                      className="w-full px-3 py-1 text-lg text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent focus:outline-none flex-1 min-w-0"
                  />
                  <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center justify-center p-1.5 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-inner">
                          <CommandIcon />
                      </div>
                      <div className="flex items-center justify-center w-6 h-6 p-1 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-inner">
                          <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">K</span>
                      </div>
                  </div>
              </div>
          </div> */}
          {/* <div className='rounded-full bg-gradient-to-r from-orange-500 via-purple-600 to-pink-600 shadow-lg shadow-purple-500/20 dark:shadow-purple-600/30 transition-shadow duration-300 hover:shadow-purple-500/40 dark:hover:shadow-purple-600/50 focus-within:shadow-purple-500/40 dark:focus-within:shadow-purple-600/50'>
            <Input type="text" placeholder="Type somthing here..." className='bg-white/10 outline-none cursor-pointer hover:bg-red-500/5 backdrop-blur-sm border-0 text-white px-4 py-2 h-10 rounded-full transition-colors w-full placeholder:text-white' />
          </div> */}
          <div className='flex flex-row w-full relative'>
            <input type="text" placeholder="Type somthing here..." className='bg-black/40 border-1 border-white/20 outline-none cursor-pointer backdrop-blur-sm text-white px-4 py-2 h-10 rounded-full transition-colors w-full placeholder:text-white' />
          </div>
                     <div className='grid grid-cols-4 gap-5 w-full'>
              <GlowCard 
                className='cursor-pointer' 
                showNew={true} 
                bottomRightImage="/images/tk-1.png"
                title="React"
                description="A JavaScript library for building user interfaces."
              />
             
             <GlowCard 
               className='cursor-pointer' 
               showNew={false} 
               bottomRightImage="/images/tk.png"
               title="Vue.js"
               description="The Progressive JavaScript Framework."
             />
             
             <GlowCard 
               className='cursor-pointer' 
               showNew={true} 
               bottomRightImage="/images/tk-1.png"
               title="Angular"
               description="Platform for building mobile and desktop web applications."
             />
             
             <GlowCard 
               className='cursor-pointer' 
               showNew={false} 
               bottomRightImage="/images/tk.png"
               title="Svelte"
               description="Cybernetically enhanced web apps."
             />
             
             <GlowCard 
               className='cursor-pointer' 
               showNew={false} 
               bottomRightImage="/images/tk-1.png"
               title="Next.js"
               description="The React Framework for Production."
             />
             
             <GlowCard 
               className='cursor-pointer' 
               showNew={true} 
               bottomRightImage="/images/tk.png"
               title="Nuxt.js"
               description="The Intuitive Vue Framework."
             />
             
             <GlowCard 
               className='cursor-pointer' 
               showNew={false} 
               bottomRightImage="/images/tk-1.png"
               title="Gatsby"
               description="Build blazing fast, modern apps and websites."
             />
             
             <GlowCard 
               className='cursor-pointer' 
               showNew={false} 
               bottomRightImage="/images/tk.png"
               title="Remix"
               description="Full stack web framework focused on web standards."
             />
           </div>

        </div>
      </section>
    </div>
  );
}

const Navbar = () => {
  return (
    <div className="fixed top-5 z-50 w-1/2  bg-red-500/5 backdrop-blur-sm border-1 border-white/50 rounded-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className='text-white text-xl font-bold'>Logo</h1>
          </div>
          <nav className="hidden md:flex space-x-8 flex-row items-center justify-center">
            <a href="#" className="text-white hover:text-red-400 transition-colors"><HomeIcon className='w-4 h-4 text-white' /></a>
            <a href="#" className="text-white hover:text-red-400 transition-colors">Favorites</a>
            <a href="#" className="text-white hover:text-red-400 transition-colors">Contact</a>
          </nav>
        </div>
      </div>
    </div>
  );
};