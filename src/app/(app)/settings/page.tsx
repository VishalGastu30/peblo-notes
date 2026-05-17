'use client';

import React, { useState, useEffect } from 'react';
import { User, SlidersHorizontal, Sparkles, Loader2, Check } from 'lucide-react';
import { TopBar } from '@/components/layout/top-bar';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { data: session, update: updateSession } = useSession();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session?.user?.name]);

  const handleNameChange = (value: string) => {
    setName(value);
    setIsDirty(value !== (session?.user?.name || ''));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error('Failed to save');
      await updateSession({ name });
      setIsDirty(false);
      toast({ title: 'Profile updated successfully' });
    } catch {
      toast({ title: 'Failed to save changes', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar h-full w-full bg-surface">
      <TopBar title="Settings" showSearch={false} />
      <div className="max-w-4xl mx-auto p-12">
        
        {/* User Profile Card */}
        <div className="glass-card bg-surface-container-low border border-white/5 rounded-[28px] p-8 mb-12 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full border-2 border-secondary/30 bg-surface-variant flex items-center justify-center shadow-[0_0_20px_rgba(221,184,255,0.15)] overflow-hidden">
              {session?.user?.image ? (
                <img src={session.user.image} alt={session.user.name || 'Profile'} className="w-full h-full object-cover" />
              ) : (
                <User className="w-10 h-10 text-outline" />
              )}
            </div>
            <div>
              <h2 className="font-title-md text-headline-lg text-on-surface">{session?.user?.name || 'User'}</h2>
              <p className="text-body-sm text-outline">{session?.user?.email || ''}</p>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {/* SECTION 1 - Account */}
          <section className="space-y-6">
            <h3 className="font-title-md text-title-md text-primary flex items-center gap-3 border-b border-white/5 pb-4">
              <User className="w-5 h-5" />
              Account
            </h3>
            <div className="glass-card bg-surface-container-lowest border border-white/5 rounded-[24px] p-8 space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-body-lg text-on-surface">Full Name</h4>
                  <p className="text-body-sm text-outline">Your display name across workspaces.</p>
                </div>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="bg-surface-container-low border border-white/10 rounded-xl px-4 py-2 text-on-surface w-64 focus:border-primary outline-none transition-colors" 
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-body-lg text-on-surface">Email Address</h4>
                  <p className="text-body-sm text-outline">Used for login and notifications.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-on-surface-variant">{session?.user?.email || ''}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-body-lg text-on-surface">Change Password</h4>
                  <p className="text-body-sm text-outline">Ensure your account stays secure.</p>
                </div>
                <button 
                  onClick={() => toast({ title: 'Password reset link sent to your email.' })}
                  className="px-4 py-1.5 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium"
                >
                  Update
                </button>
              </div>
              <div className="pt-4 border-t border-error/10 flex justify-between items-center">
                <div>
                  <h4 className="font-body-lg text-error">Delete Account</h4>
                  <p className="text-body-sm text-error/70">Permanently remove your account and all data.</p>
                </div>
                <button 
                  onClick={async () => {
                    if (!confirm('Are you sure you want to permanently delete your account? This cannot be undone.')) return;
                    setIsSaving(true);
                    try {
                      await fetch('/api/user/profile', { method: 'DELETE' });
                      await fetch('/api/auth/signout', { method: 'POST' }); // Or use signOut() from next-auth/react
                      window.location.href = '/login';
                    } catch (err) {
                      toast({ title: 'Failed to delete account', variant: 'destructive' });
                      setIsSaving(false);
                    }
                  }}
                  className="px-4 py-1.5 border border-error/30 text-error rounded-lg hover:bg-error/10 transition-colors text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 2 - Workspace Preferences */}
          <section className="space-y-6">
            <h3 className="font-title-md text-title-md text-primary flex items-center gap-3 border-b border-white/5 pb-4">
              <SlidersHorizontal className="w-5 h-5" />
              Workspace Preferences
            </h3>
            <div className="glass-card bg-surface-container-lowest border border-white/5 rounded-[24px] p-8 space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-body-lg text-on-surface">Default Sort Order</h4>
                  <p className="text-body-sm text-outline">How notes appear in your list.</p>
                </div>
                <select 
                  defaultValue={typeof window !== 'undefined' ? localStorage.getItem('peblo_default_sort') || 'updated' : 'updated'}
                  onChange={(e) => {
                    if (typeof window !== 'undefined') {
                      localStorage.setItem('peblo_default_sort', e.target.value);
                      toast({ title: 'Default sort order updated' });
                    }
                  }}
                  className="bg-surface-container-low border border-white/10 rounded-xl px-4 py-2 text-on-surface w-48 focus:border-primary outline-none appearance-none cursor-pointer"
                >
                  <option value="updated">Most Recent</option>
                  <option value="title">Alphabetical</option>
                  <option value="created">Creation Date</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-body-lg text-on-surface">Show AI Panel by Default</h4>
                  <p className="text-body-sm text-outline">Open the insights panel automatically.</p>
                </div>
                <div 
                  onClick={() => {
                    const currentState = typeof window !== 'undefined' ? localStorage.getItem('peblo_ai_panel_open') === 'true' : false;
                    const newState = !currentState;
                    if (typeof window !== 'undefined') {
                      localStorage.setItem('peblo_ai_panel_open', String(newState));
                    }
                    // Force a re-render by doing a fake state update or simply updating session/toast
                    toast({ title: `AI Panel default set to ${newState ? 'On' : 'Off'}` });
                    // To visually update the toggle, we can read from localStorage
                    document.getElementById('ai-panel-toggle-knob')?.classList.toggle('right-0.5', newState);
                    document.getElementById('ai-panel-toggle-knob')?.classList.toggle('left-0.5', !newState);
                    document.getElementById('ai-panel-toggle-bg')?.classList.toggle('bg-primary/20', newState);
                    document.getElementById('ai-panel-toggle-bg')?.classList.toggle('bg-surface-variant', !newState);
                  }}
                  id="ai-panel-toggle-bg"
                  className={`w-12 h-6 rounded-full relative cursor-pointer border transition-colors duration-300 ${typeof window !== 'undefined' && localStorage.getItem('peblo_ai_panel_open') === 'true' ? 'bg-primary/20 border-primary/50' : 'bg-surface-variant border-white/10'}`}
                >
                  <div 
                    id="ai-panel-toggle-knob"
                    className={`w-5 h-5 bg-primary rounded-full absolute top-0.5 shadow-sm transition-all duration-300 ${typeof window !== 'undefined' && localStorage.getItem('peblo_ai_panel_open') === 'true' ? 'right-0.5' : 'left-0.5'}`}
                  ></div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3 - AI Settings */}
          <section className="space-y-6">
            <h3 className="font-title-md text-title-md text-primary flex items-center gap-3 border-b border-white/5 pb-4">
              <Sparkles className="w-5 h-5" />
              AI Integration
            </h3>
            <div className="glass-card bg-surface-container-lowest border border-white/5 rounded-[24px] p-8 space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-body-lg text-on-surface">Active Provider</h4>
                  <p className="text-body-sm text-outline">The LLM powering your insights.</p>
                </div>
                <span className="px-3 py-1 bg-surface-bright border border-white/10 rounded-full text-xs font-bold tracking-widest text-secondary uppercase">
                  Groq AI
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-body-lg text-on-surface">Monthly Usage</h4>
                  <p className="text-body-sm text-outline">Your current generation limits.</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium mb-1">Free tier</p>
                  <div className="w-48 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="w-1/4 h-full bg-primary rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
        
        {/* Floating Save Button */}
        {isDirty && (
          <div className="fixed bottom-12 right-12 animate-in fade-in slide-in-from-bottom-4">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="px-8 py-3 bg-primary text-on-primary font-bold tracking-wide rounded-full shadow-[0_0_30px_rgba(242,202,80,0.2)] hover:scale-105 transition-transform disabled:opacity-70 flex items-center gap-2"
            >
              {isSaving ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
              ) : (
                <><Check className="w-4 h-4" /> SAVE CHANGES</>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
