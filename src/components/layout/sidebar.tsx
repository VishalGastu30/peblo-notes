'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Plus, FileText, Clock, Archive, Users, BarChart3, 
  Settings, HelpCircle, User, ChevronLeft, ChevronRight, LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut, useSession } from 'next-auth/react';

const navItems = [
  { href: '/workspace', icon: FileText, label: 'All Notes' },
  { href: '/workspace?sort=recent', icon: Clock, label: 'Recent' },
  { href: '/archive', icon: Archive, label: 'Archived' },
  { href: '/shared', icon: Users, label: 'Shared' },
  { href: '/insights', icon: BarChart3, label: 'Insights' },
];

const bottomNavItems = [
  { href: '/settings', icon: Settings, label: 'Settings' },
  { href: '/help', icon: HelpCircle, label: 'Help' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { data: session } = useSession();

  const isNavActive = (href: string) => {
    // For query-param links like /workspace?sort=recent, match the path part
    const [path, query] = href.split('?');
    if (query) {
      return pathname === path && typeof window !== 'undefined' && window.location.search.includes(query);
    }
    return pathname === path || pathname.startsWith(path + '/');
  };

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="h-screen left-0 top-0 bg-surface-container-low/80 backdrop-blur-xl border-r border-white/[0.06] flex flex-col py-6 z-50 relative"
    >
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 w-6 h-6 bg-surface-container border border-white/10 rounded-full flex items-center justify-center text-outline hover:text-primary hover:border-primary/30 transition-all z-10 shadow-lg"
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      {/* Brand */}
      <div className={cn("mb-8 px-6 overflow-hidden whitespace-nowrap", isCollapsed && "px-4 flex flex-col items-center")}>
        {isCollapsed ? (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center shadow-[0_0_12px_rgba(242,202,80,0.2)]">
            <FileText className="w-4 h-4 text-on-primary" />
          </div>
        ) : (
          <>
            <h1 className="font-display-hero text-title-md text-primary">Peblo Notes</h1>
            <p className="font-label-caps text-[10px] tracking-widest text-on-surface-variant uppercase">AI Workspace</p>
          </>
        )}
      </div>
      
      {/* New Note Button */}
      <div className="px-4 mb-6">
        <button className={cn(
          "w-full bg-primary font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_15px_rgba(242,202,80,0.2)] overflow-hidden",
          isCollapsed ? "py-3 rounded-xl" : "py-3.5 rounded-2xl text-sm"
        )}>
          <Plus className="w-5 h-5 shrink-0 text-background" />
          {!isCollapsed && <span className="text-background font-bold tracking-wide">New Note</span>}
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 overflow-y-auto custom-scrollbar overflow-x-hidden">
        {navItems.map((item) => {
          const active = isNavActive(item.href);
          const Icon = item.icon;

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className="relative flex items-center h-11 rounded-xl group overflow-hidden"
              title={isCollapsed ? item.label : undefined}
            >
              {/* Glass Active Background */}
              {active && (
                <motion.div 
                  layoutId="activeNavBg"
                  className="absolute inset-0 bg-white/[0.07] backdrop-blur-sm border border-white/[0.1] rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              {/* Left Active Indicator */}
              {active && (
                <motion.div 
                  layoutId="activeNavIndicator"
                  className="absolute left-0 top-[20%] bottom-[20%] w-[3px] bg-primary rounded-r-full shadow-[0_0_8px_rgba(242,202,80,0.4)]"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              
              {/* Hover Background */}
              {!active && (
                <div className="absolute inset-0 bg-white/[0.03] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              )}

              <div className={cn(
                "relative z-10 flex items-center gap-3.5 transition-colors duration-200",
                isCollapsed ? "justify-center w-full" : "px-4",
                active ? "text-primary" : "text-on-surface-variant group-hover:text-on-surface"
              )}>
                <Icon className={cn("w-[18px] h-[18px] shrink-0", active && "drop-shadow-[0_0_4px_rgba(242,202,80,0.3)]")} />
                {!isCollapsed && (
                  <span className={cn(
                    "text-[13px] tracking-wide",
                    active ? "font-semibold" : "font-medium"
                  )}>{item.label}</span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>
      
      {/* Bottom Section */}
      <div className="mt-auto pt-4 border-t border-white/[0.05] space-y-1 px-3">
        {bottomNavItems.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className="relative flex items-center h-11 rounded-xl group overflow-hidden"
              title={isCollapsed ? item.label : undefined}
            >
              {active && (
                <motion.div 
                  layoutId="activeNavBg"
                  className="absolute inset-0 bg-white/[0.07] backdrop-blur-sm border border-white/[0.1] rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              {active && (
                <motion.div 
                  layoutId="activeNavIndicator"
                  className="absolute left-0 top-[20%] bottom-[20%] w-[3px] bg-primary rounded-r-full shadow-[0_0_8px_rgba(242,202,80,0.4)]"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              {!active && (
                <div className="absolute inset-0 bg-white/[0.03] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              )}
              
              <div className={cn(
                "relative z-10 flex items-center gap-3.5 transition-colors duration-200",
                isCollapsed ? "justify-center w-full" : "px-4",
                active ? "text-primary" : "text-on-surface-variant group-hover:text-on-surface"
              )}>
                <Icon className="w-[18px] h-[18px] shrink-0" />
                {!isCollapsed && <span className="text-[13px] font-medium tracking-wide">{item.label}</span>}
              </div>
            </Link>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="relative flex items-center h-11 rounded-xl group overflow-hidden w-full"
          title={isCollapsed ? 'Log out' : undefined}
        >
          <div className="absolute inset-0 bg-white/[0.03] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <div className={cn(
            "relative z-10 flex items-center gap-3.5 text-on-surface-variant group-hover:text-error transition-colors duration-200",
            isCollapsed ? "justify-center w-full" : "px-4"
          )}>
            <LogOut className="w-[18px] h-[18px] shrink-0" />
            {!isCollapsed && <span className="text-[13px] font-medium tracking-wide">Log out</span>}
          </div>
        </button>

        {/* User Avatar */}
        <div className={cn(
          "flex items-center gap-3 mt-3 overflow-hidden",
          isCollapsed ? "justify-center py-2" : "px-4 py-3"
        )}>
          <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center bg-surface-variant/50 shrink-0 shadow-[0_0_8px_rgba(242,202,80,0.1)]">
            <User className="w-4 h-4 text-on-surface-variant" />
          </div>
          {!isCollapsed && (
            <span className="text-[13px] font-medium whitespace-nowrap text-on-surface-variant">
              {session?.user?.name || 'User'}
            </span>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
