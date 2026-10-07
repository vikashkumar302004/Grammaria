"use client";

import React from 'react';
import { X, Trophy, Medal, Swords, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { LEADERBOARD_DATA } from '@/data/territories';

interface LeaderboardModalProps {
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-xl bg-slate-900 border-2 border-amber-600/70 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden text-slate-100"
      >
        <div className="p-5 bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-b border-amber-600/40 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Trophy className="w-7 h-7 text-amber-400" />
            <div>
              <h3 className="font-cinzel text-xl font-bold text-amber-100">
                Class 10-A Assault Leaderboard
              </h3>
              <p className="text-xs text-amber-200/70">
                Live Classroom Rankings — Active Assault #4
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

        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {LEADERBOARD_DATA.map((user) => {
            const isMe = user.name.includes('(You)');
            let rankColor = "text-slate-400";
            if (user.rank === 1) rankColor = "text-yellow-400";
            if (user.rank === 2) rankColor = "text-amber-300";
            if (user.rank === 3) rankColor = "text-amber-600";

            return (
              <div
                key={user.rank}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                  isMe
                    ? 'bg-amber-950/70 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank Badge */}
                  <div className={`font-cinzel font-black text-lg w-8 text-center ${rankColor}`}>
                    #{user.rank}
                  </div>
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-slate-900 border border-amber-500/40 flex items-center justify-center text-lg">
                    {user.avatar}
                  </div>
                  {/* Name & Stats */}
                  <div>
                    <h4 className={`font-bold text-sm ${isMe ? 'text-amber-200' : 'text-slate-100'}`}>
                      {user.name}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        {user.capturedCount} Territories
                      </span>
                      <span className="flex items-center gap-1">
                        <Swords className="w-3.5 h-3.5 text-rose-400" />
                        Status: {user.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div className="text-right">
                  <span className="text-[10px] text-amber-300/70 uppercase block font-mono">
                    Total XP
                  </span>
                  <span className="font-mono font-bold text-amber-300 text-base">
                    {user.xp.toLocaleString()}
                  </span>
                </div>
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
