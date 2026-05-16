'use client';

import React, { useState } from 'react';
import { Bold, Italic, List, Link as LinkIcon, Share2, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export function NoteEditor() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="col-span-6 bg-surface flex flex-col h-full relative overflow-hidden z-0">
      {/* Background glow when editor is active */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none transition-opacity duration-1000 opacity-50"></div>

      {/* Toolbar */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="h-16 flex items-center justify-between px-8 border-b border-white/5 relative z-10 bg-surface/50 backdrop-blur-md"
      >
        <div className="flex items-center gap-2">
          {[
            { icon: Bold, id: 'bold' },
            { icon: Italic, id: 'italic' },
            { icon: List, id: 'list' },
          ].map((item) => (
            <button 
              key={item.id}
              className="w-8 h-8 flex items-center justify-center text-outline hover:text-on-surface hover:bg-white/5 rounded-md transition-colors cursor-pointer group"
            >
              <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          ))}
          <div className="w-px h-4 bg-white/10 mx-2"></div>
          <button className="w-8 h-8 flex items-center justify-center text-outline hover:text-on-surface hover:bg-white/5 rounded-md transition-colors cursor-pointer group">
            <LinkIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute w-2 h-2 rounded-full bg-primary/40 animate-ping"></span>
              <span className="relative w-1.5 h-1.5 rounded-full bg-primary"></span>
            </div>
            <span className="text-[11px] font-label-caps text-outline">
              Saved to Cloud
            </span>
          </motion.div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-1.5 text-body-sm font-medium border border-white/10 rounded-full hover:bg-white/5 transition-colors flex items-center gap-2 group">
              <Share2 className="w-3.5 h-3.5 text-outline group-hover:text-on-surface transition-colors" />
              Share
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full hover:bg-white/5 transition-colors">
              <MoreHorizontal className="w-4 h-4 text-outline" />
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Editor Canvas */}
      <div className="flex-1 overflow-y-auto px-16 py-12 custom-scrollbar relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <input 
            className="w-full bg-transparent border-none p-0 mb-8 font-display-hero text-display-hero leading-tight focus:ring-0 text-on-surface outline-none placeholder:text-outline/30" 
            type="text" 
            defaultValue="Product Strategy 2024"
            placeholder="Note Title"
          />
          <div className="prose prose-invert max-w-none text-body-lg text-on-surface-variant space-y-6 leading-relaxed">
            <p>Our objective for 2024 centers on the intersection of <strong>Luxury Editorial</strong> and <strong>Futuristic Workspaces</strong>. We are not just building a note-taking app; we are crafting a digital atelier for the modern intellectual.</p>
            <h2 className="font-title-md text-on-surface text-2xl pt-4">Core Pillars</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li className="pl-2 marker:text-primary">Focus-First Interface: Reducing cognitive load through intentional negative space.</li>
              <li className="pl-2 marker:text-primary">Radiant Intelligence: AI features that feel like a subtle glow rather than a disruptive interruption.</li>
              <li className="pl-2 marker:text-primary">Tactile Digitalism: Using glassmorphism and depth to simulate physical premium materials like obsidian and polished metal.</li>
            </ul>
            <p>The transition to dark-mode-first is not merely an aesthetic choice. It is a functional requirement for prolonged deep work sessions, minimizing eye strain while emphasizing the vibrant gold and iris accents that represent active AI cognition.</p>
            
            <motion.div 
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              className="relative h-48 w-full rounded-2xl overflow-hidden my-10 border border-white/5 cursor-pointer group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-surface-container to-surface-container group-hover:from-primary/20 transition-colors duration-500"></div>
              <motion.div 
                animate={{ 
                  scale: isHovered ? 1.05 : 1,
                  opacity: isHovered ? 1 : 0.8
                }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow"></span>
                  </div>
                  <span className="text-primary font-label-caps tracking-widest text-xs opacity-70 group-hover:opacity-100 transition-opacity">INTERACTIVE VISUALIZATION</span>
                </div>
              </motion.div>
            </motion.div>

            <p>Future iterations will include the 'Loom' view—a three-dimensional visualization of thought connections, utilizing the primary amber color to map neural links across archived and active workspace datasets.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
