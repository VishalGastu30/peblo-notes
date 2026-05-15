import React from 'react';

export default function SettingsPage() {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar h-full w-full bg-surface">
      <div className="max-w-4xl mx-auto p-12">
        <h1 className="font-display-hero text-[48px] text-on-surface mb-12">Settings</h1>
        
        {/* User Profile Card */}
        <div className="glass-card bg-surface-container-low border border-white/5 rounded-[28px] p-8 mb-12 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img alt="User profile avatar" className="w-20 h-20 rounded-full border-2 border-secondary/30 object-cover shadow-[0_0_20px_rgba(221,184,255,0.15)]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2fZ8NBG0ol0ykCKQyNcX6DBeK7TGrhQericZ4MWCTLwp1zZJSd4wu7tcXNoEJX8fDKs0Q51BTYTSAfpf1mJVUrKKUlGQrUGPyblXAUBK22EwKh9zQZAouRkDDZd1ZO1cBGm-qiCSwsS_5LjiXXfpT_x_2VFcl8IwzSgUrty5pF_pgFE02dIpqdOWNwlgyK1d_vzSpT9YD048YEb5BED_8IffTdGEQbGDn_HQHfOx-RZETujmH7Of8QmCPwkhAHnyyUIc-SNxY6VaS"/>
            <div>
              <h2 className="font-title-md text-[24px] text-on-surface">Julian Rossi</h2>
              <p className="text-body-sm text-outline">julian@peblo.ai</p>
            </div>
          </div>
          <button className="px-6 py-2 border border-white/10 text-on-surface rounded-xl font-label-caps tracking-widest hover:bg-white/5 transition-colors">
            EDIT PROFILE
          </button>
        </div>

        <div className="space-y-12">
          {/* SECTION 1 - Account */}
          <section className="space-y-6">
            <h3 className="font-title-md text-[20px] text-primary flex items-center gap-3 border-b border-white/5 pb-4">
              <span className="material-symbols-outlined text-[20px]">person</span>
              Account
            </h3>
            <div className="glass-card bg-surface-container-lowest border border-white/5 rounded-[24px] p-8 space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-body-lg text-on-surface">Full Name</h4>
                  <p className="text-body-sm text-outline">Your display name across workspaces.</p>
                </div>
                <input type="text" defaultValue="Julian Rossi" className="bg-surface-container-low border border-white/10 rounded-xl px-4 py-2 text-on-surface w-64 focus:border-primary outline-none" />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-body-lg text-on-surface">Email Address</h4>
                  <p className="text-body-sm text-outline">Used for login and notifications.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-on-surface-variant">julian@peblo.ai</span>
                  <button className="text-secondary text-sm font-medium hover:underline">Change</button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-body-lg text-on-surface">Change Password</h4>
                  <p className="text-body-sm text-outline">Ensure your account stays secure.</p>
                </div>
                <button className="px-4 py-1.5 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium">Update</button>
              </div>
              <div className="pt-4 border-t border-error/10 flex justify-between items-center">
                <div>
                  <h4 className="font-body-lg text-error">Delete Account</h4>
                  <p className="text-body-sm text-error/70">Permanently remove your account and all data.</p>
                </div>
                <button className="px-4 py-1.5 border border-error/30 text-error rounded-lg hover:bg-error/10 transition-colors text-sm font-medium">Delete</button>
              </div>
            </div>
          </section>

          {/* SECTION 2 - Workspace Preferences */}
          <section className="space-y-6">
            <h3 className="font-title-md text-[20px] text-primary flex items-center gap-3 border-b border-white/5 pb-4">
              <span className="material-symbols-outlined text-[20px]">tune</span>
              Workspace Preferences
            </h3>
            <div className="glass-card bg-surface-container-lowest border border-white/5 rounded-[24px] p-8 space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-body-lg text-on-surface">Default Sort Order</h4>
                  <p className="text-body-sm text-outline">How notes appear in your list.</p>
                </div>
                <select className="bg-surface-container-low border border-white/10 rounded-xl px-4 py-2 text-on-surface w-48 focus:border-primary outline-none appearance-none">
                  <option>Most Recent</option>
                  <option>Alphabetical</option>
                  <option>Creation Date</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-body-lg text-on-surface">Show AI Panel by Default</h4>
                  <p className="text-body-sm text-outline">Open the insights panel automatically.</p>
                </div>
                <div className="w-12 h-6 bg-primary/20 rounded-full relative cursor-pointer border border-primary/50">
                  <div className="w-5 h-5 bg-primary rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3 - AI Settings */}
          <section className="space-y-6">
            <h3 className="font-title-md text-[20px] text-primary flex items-center gap-3 border-b border-white/5 pb-4">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              AI Integration
            </h3>
            <div className="glass-card bg-surface-container-lowest border border-white/5 rounded-[24px] p-8 space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-body-lg text-on-surface">Active Provider</h4>
                  <p className="text-body-sm text-outline">The LLM powering your insights.</p>
                </div>
                <span className="px-3 py-1 bg-surface-bright border border-white/10 rounded-full text-xs font-bold tracking-widest text-secondary uppercase">
                  Anthropic Claude
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-body-lg text-on-surface">Monthly Usage</h4>
                  <p className="text-body-sm text-outline">Your current generation limits.</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium mb-1">47 / 200 generations</p>
                  <div className="w-48 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="w-1/4 h-full bg-primary rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
        
        {/* Floating Save Button */}
        <div className="fixed bottom-12 right-12">
          <button className="px-8 py-3 bg-primary text-on-primary font-bold tracking-wide rounded-full shadow-[0_0_30px_rgba(242,202,80,0.2)] hover:scale-105 transition-transform">
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
}
