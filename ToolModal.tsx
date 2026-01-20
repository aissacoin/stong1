
import React, { useEffect, useCallback } from 'react';
import { X, ShieldCheck, Info, Book, Target, HelpCircle, Check, Zap } from 'lucide-react';
import { T as t } from '../translations';

interface ToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  toolId?: string;
  children: React.ReactNode;
}

export const ToolModal: React.FC<ToolModalProps> = ({ isOpen, onClose, title, toolId, children }) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const toolInfo = toolId ? (t.tools as any)[toolId] : null;
  const doc = toolInfo?.doc;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#3c2f2f]/40 backdrop-blur-sm overflow-y-auto" dir="ltr">
      <div className="bg-[#fdf6e3] rounded-3xl w-full max-w-4xl shadow-2xl border border-[#e7d8c5] overflow-hidden flex flex-col my-auto relative animate-in zoom-in duration-200">
        
        <div className="flex justify-between items-center px-8 py-6 border-b border-[#e7d8c5]">
          <h3 className="text-2xl font-extrabold text-[#3c2f2f] tracking-tight">
            {toolInfo?.name || title}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-[#f3ece0] rounded-full text-[#7d6e6e] transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar flex-grow">
          <div className="space-y-12">
            {/* Tool Area */}
            <div className="bg-[#fdfaf3] rounded-2xl border border-[#e7d8c5] p-8 shadow-inner">
               {children}
            </div>

            {/* Doc Area */}
            {doc && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-[#e7d8c5]">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase text-[#b45309] flex items-center gap-2">
                    <Info size={16}/> {t.common.about}
                  </h4>
                  <p className="text-[#7d6e6e] text-sm leading-relaxed">{doc.about}</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase text-[#b45309] flex items-center gap-2">
                    <Target size={16}/> {t.common.usage}
                  </h4>
                  <p className="text-[#7d6e6e] text-sm leading-relaxed">{doc.usage}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-8 py-4 bg-[#f3ece0] border-t border-[#e7d8c5] flex items-center justify-between text-xs font-bold text-[#b7a896]">
           <div className="flex items-center gap-2 text-emerald-700">
             <ShieldCheck size={16} />
             <span>100% Client-Side & Private</span>
           </div>
           <span>StrongTools Comfort Mode</span>
        </div>
      </div>
    </div>
  );
};
