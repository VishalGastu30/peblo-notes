'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';
import { Share2, X, Copy, Check, ExternalLink, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mutate } from 'swr';

interface ShareDialogProps {
  noteId: string;
  isPublic: boolean;
  shareId: string | null;
  trigger: React.ReactNode;
}

export function ShareDialog({ noteId, isPublic: initialIsPublic, shareId: initialShareId, trigger }: ShareDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(initialIsPublic);
  const [shareId, setShareId] = useState(initialShareId);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Construct URL. In a real app this would use an environment variable for the domain.
  const shareUrl = shareId ? `${typeof window !== 'undefined' ? window.location.origin : ''}/shared/${shareId}` : '';

  const handleToggle = async (checked: boolean) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/notes/${noteId}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublic: checked })
      });
      
      if (!res.ok) throw new Error('Failed to update sharing settings');
      
      const data = await res.json();
      setIsPublic(data.data.isPublic);
      setShareId(data.data.shareId);
      
      mutate((key) => typeof key === 'string' && key.startsWith('/api/notes'));
      
      if (!checked) {
        toast({ title: 'Note is now private' });
      }
    } catch (error) {
      toast({ title: 'Error updating sharing settings', variant: 'destructive' });
      setIsPublic(!checked); // Revert UI
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({ title: 'Link copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        {trigger}
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 bg-surface-container-high border border-white/10 p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-[24px]">
          
          <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
            <Dialog.Title className="font-title-md text-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <Share2 className="w-5 h-5 text-primary" />
              </div>
              Share Note
            </Dialog.Title>
            <Dialog.Description className="text-body-sm text-on-surface-variant pt-2">
              Make this note accessible to anyone with the link.
            </Dialog.Description>
          </div>

          <div className="flex items-center justify-between py-4 border-y border-white/5 my-4">
            <div>
              <h4 className="font-body-lg text-on-surface">Publish to web</h4>
              <p className="text-[12px] text-outline mt-1">Anyone with the link can view.</p>
            </div>
            
            <div className="flex items-center gap-3">
              {isLoading && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
              <Switch.Root
                checked={isPublic}
                onCheckedChange={handleToggle}
                disabled={isLoading}
                className="w-[42px] h-[24px] bg-surface-container border border-white/10 rounded-full relative data-[state=checked]:bg-primary outline-none cursor-pointer transition-colors"
              >
                <Switch.Thumb className="block w-[18px] h-[18px] bg-outline rounded-full shadow-sm transition-transform duration-100 translate-x-[3px] will-change-transform data-[state=checked]:translate-x-[21px] data-[state=checked]:bg-white" />
              </Switch.Root>
            </div>
          </div>

          <div className="space-y-3 transition-all duration-300 overflow-hidden" style={{ height: isPublic ? 'auto' : 0, opacity: isPublic ? 1 : 0 }}>
            <label className="text-xs font-bold uppercase tracking-wider text-outline">Public Link</label>
            <div className="flex items-center gap-2">
              <input 
                readOnly
                value={shareUrl}
                className="flex-1 bg-surface-container border border-white/10 rounded-xl px-4 py-2.5 text-sm text-on-surface outline-none"
              />
              <button 
                onClick={handleCopy}
                className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <a 
              href={shareUrl} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline mt-2"
            >
              <ExternalLink className="w-3 h-3" />
              Open in new tab
            </a>
          </div>

          <Dialog.Close asChild>
            <button className="absolute right-6 top-6 rounded-full w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 text-outline transition-colors outline-none">
              <X className="w-4 h-4" />
              <span className="sr-only">Close</span>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
