"use client";

import React, { useState } from 'react';
import { X, Gift, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface DailyRewardModalProps {
  onClose: () => void;
  onClaimRewards: (coins: number, gems: number) => void;
}

export const DailyRewardModal: React.FC<DailyRewardModalProps> = ({
  onClose,
  onClaimRewards,
}) => {
  const [claimed, setClaimed] = useState(false);

  const handleOpenChest = () => {
    setClaimed(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
    onClaimRewards(500, 25);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-md bg-slate-900 border-2 border-amber-500/70 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden text-slate-100 text-center"
      >
        <div className="p-4 bg-amber-950/60 border-b border-amber-600/40 flex justify-between items-center">
          <span className="font-cinzel font-bold text-amber-200 text-sm">
            Daily Treasure Chest
          </span>
          <button
            onClick={onClose}
            className="text-amber-400/60 hover:text-amber-200 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <motion.div
            animate={claimed ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : { y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: claimed ? 0 : Infinity }}
            className="w-24 h-24 mx-auto bg-gradient-to-b from-amber-600 to-yellow-600 border-4 border-amber-300 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.6)]"
          >
            <Gift className="w-12 h-12 text-slate-950" />
          </motion.div>

          {claimed ? (
            <div className="space-y-2">
              <h3 className="font-cinzel text-2xl font-black text-amber-200">
                TREASURE CLAIMED!
              </h3>
              <p className="text-xs text-slate-300">
                You received your daily commander allowance:
              </p>
              <div className="flex justify-center gap-4 pt-2 font-mono font-bold text-sm">
                <span className="text-yellow-400 bg-yellow-950/80 px-4 py-2 rounded-xl border border-yellow-500/40">
                  +500 Gold Coins
                </span>
                <span className="text-cyan-400 bg-cyan-950/80 px-4 py-2 rounded-xl border border-cyan-500/40">
                  +25 Gems
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <h3 className="font-cinzel text-xl font-bold text-amber-100">
                Day 5 Conquest Bounty
              </h3>
              <p className="text-xs text-slate-300">
                Open your daily chest to claim gold and rare gems!
              </p>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-950 border-t border-amber-600/40">
          {claimed ? (
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
            >
              Close
            </button>
          ) : (
            <button
              onClick={handleOpenChest}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-slate-950 font-cinzel font-black text-sm tracking-wider shadow-lg hover:scale-105 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> OPEN CHEST
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
