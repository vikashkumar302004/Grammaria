"use client";

import React, { useState } from 'react';
import { X, Target, CheckCircle2, Award, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface DailyChallengeModalProps {
  onClose: () => void;
  onClaimXP: (amount: number) => void;
}

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  onClose,
  onClaimXP,
}) => {
  const [completedQuests, setCompletedQuests] = useState<number[]>([]);

  const quests = [
    {
      id: 1,
      title: "Conquer 2 Enemy Territories",
      desc: "Attack and reduce resistance in any 2 active territories.",
      xp: 150,
      coins: 200,
    },
    {
      id: 2,
      title: "Perfect Grammar Streak",
      desc: "Answer 3 consecutive attack questions without getting blocked.",
      xp: 200,
      coins: 300,
    },
    {
      id: 3,
      title: "Study Topic Intelligence",
      desc: "Read the study guide for any uncaptured realm.",
      xp: 100,
      coins: 150,
    }
  ];

  const handleClaim = (id: number, xp: number) => {
    if (!completedQuests.includes(id)) {
      setCompletedQuests([...completedQuests, id]);
      onClaimXP(xp);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-lg bg-slate-900 border-2 border-amber-600/70 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden text-slate-100"
      >
        <div className="p-5 bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-b border-amber-600/40 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Target className="w-7 h-7 text-amber-400" />
            <div>
              <h3 className="font-cinzel text-xl font-bold text-amber-100">
                Daily Grammar Quests
              </h3>
              <p className="text-xs text-amber-200/70">
                Resets in 14 hours 22 minutes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-amber-400/60 hover:text-amber-200 p-1.5 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {quests.map((q) => {
            const isDone = completedQuests.includes(q.id);

            return (
              <div
                key={q.id}
                className="bg-slate-950/80 border border-amber-900/50 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-amber-500/50 transition"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-amber-200 flex items-center gap-2">
                    {q.title}
                  </h4>
                  <p className="text-xs text-slate-400">{q.desc}</p>
                  <div className="flex items-center gap-3 text-xs font-mono pt-1">
                    <span className="text-amber-400">+{q.xp} XP</span>
                    <span className="text-yellow-400">+{q.coins} Coins</span>
                  </div>
                </div>

                <button
                  disabled={isDone}
                  onClick={() => handleClaim(q.id, q.xp)}
                  className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold transition flex items-center gap-1.5 ${
                    isDone
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-600/50'
                      : 'bg-amber-600 hover:bg-amber-500 text-slate-950 shadow-md'
                  }`}
                >
                  {isDone ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Claimed
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" /> Claim Reward
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-slate-950 border-t border-amber-600/40 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
