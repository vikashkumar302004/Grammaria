"use client";

import React from 'react';
import { X, Star, Clock, Flame, ShieldAlert, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface EventsModalProps {
  onClose: () => void;
}

export const EventsModal: React.FC<EventsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-xl bg-slate-900 border-2 border-purple-600/70 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden text-slate-100"
      >
        <div className="p-5 bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 border-b border-purple-600/40 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Star className="w-7 h-7 text-purple-400 animate-pulse" />
            <div>
              <h3 className="font-cinzel text-xl font-bold text-purple-100">
                Teacher-Run Classroom Assaults
              </h3>
              <p className="text-xs text-purple-200/70">
                Timed Multiplayer Class Conquest Events
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-purple-400/60 hover:text-purple-200 p-1.5 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Active Event 1 */}
          <div className="bg-slate-950/80 border-2 border-purple-500/60 rounded-xl p-4 space-y-3 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 bg-purple-600 text-slate-950 text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              LIVE ASSAULT
            </div>
            <div className="flex items-center gap-2 text-purple-300">
              <Flame className="w-5 h-5 text-amber-400" />
              <h4 className="font-cinzel font-bold text-base text-slate-100">
                Assault #4: The Siege of Concordia & Voicelands
              </h4>
            </div>
            <p className="text-xs text-slate-300">
              Commander Mr. Sharma has launched a 45-minute timed battle targeting Subject-Verb Agreement & Active/Passive Voice.
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-purple-300/80 pt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Time Remaining: 24m 10s
              </span>
              <span className="flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> Classroom Target: 70% Capture
              </span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-slate-100 font-cinzel font-bold text-xs shadow-md hover:scale-105 transition"
              >
                JOIN ASSAULT BATTLE <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Upcoming Event 2 */}
          <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 space-y-2 opacity-75">
            <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-800 px-2 py-0.5 rounded">
              Upcoming Assault
            </span>
            <h4 className="font-cinzel font-bold text-sm text-slate-200">
              Assault #5: The Great Capital Siege (Centralia)
            </h4>
            <p className="text-xs text-slate-400">
              Scheduled for Friday 10:00 AM. Requires mastering Tenses & Conditionals.
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-950 border-t border-purple-600/40 text-center">
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
