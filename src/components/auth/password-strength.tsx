import React from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasswordStrengthProps {
  password?: string;
}

export function PasswordStrength({ password = '' }: PasswordStrengthProps) {
  const reqs = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains an uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains a special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(password) }
  ];

  const metCount = reqs.filter(r => r.met).length;
  let strengthLabel = "Weak";
  let barColor = "bg-error";

  if (metCount === 4) {
    strengthLabel = "Strong";
    barColor = "bg-primary";
  } else if (metCount >= 2) {
    strengthLabel = "Moderate";
    barColor = "bg-amber-400";
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-[10px] font-label-caps uppercase tracking-widest">
        <span className="text-outline">Password Strength</span>
        <span className={cn(
          metCount === 4 ? "text-primary" :
          metCount >= 2 ? "text-amber-400" : "text-error"
        )}>
          {password ? strengthLabel : ''}
        </span>
      </div>
      <div className="flex gap-1">
        {[0, 1, 2, 3].map(i => (
          <div 
            key={i} 
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-500",
              password && i < metCount ? barColor : "bg-white/10"
            )}
          ></div>
        ))}
      </div>
      <div className="space-y-2 pt-2">
        {reqs.map((req, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            {req.met ? (
              <Check className="w-3.5 h-3.5 text-primary" />
            ) : (
              <X className="w-3.5 h-3.5 text-outline/50" />
            )}
            <span className={req.met ? "text-on-surface" : "text-outline/70"}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
