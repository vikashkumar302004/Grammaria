"use client";

import React, { useState } from 'react';
import { Territory } from '@/types/game';
import { X, Swords, BookOpen, ShieldCheck, Lock, Award, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpecialTerritoryView } from './SpecialTerritoryView';
import { CentraliaView } from './CentraliaView';

interface TerritoryModalProps {
  territory: Territory | null;
  onClose: () => void;
  onStartAttack: (territory: Territory) => void;
}

export const TerritoryModal: React.FC<TerritoryModalProps> = ({
  territory,
  onClose,
  onStartAttack,
}) => {
  const [activeTab, setActiveTab] = useState<'command' | 'study'>('command');

  if (!territory) return null;

  if (territory.id === 'centralia') {
    return <CentraliaView key={territory.id} territory={territory} onClose={onClose} />;
  }

  if (territory.id === 'artikel' || territory.id === 'temporalia') {
    return (
      <SpecialTerritoryView
        key={territory.id}
        territory={territory}
        onClose={onClose}
        onStartAttack={onStartAttack}
      />
    );
  }

  const isCapital = territory.id === 'centralia';
  const isLocked = territory.status === 'locked' || territory.status === 'capital-locked';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-2 border-amber-600/70 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden text-slate-100"
        >
          {/* Header Banner */}
          <div className="relative p-6 bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-b border-amber-600/40">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-amber-400/70 hover:text-amber-200 p-2 rounded-lg hover:bg-amber-950/60 transition"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-950/80 border border-amber-500/60 rounded-xl shadow-inner">
                {territory.status === 'captured' ? (
                  <ShieldCheck className="w-8 h-8 text-emerald-400" />
                ) : isLocked ? (
                  <Lock className="w-8 h-8 text-amber-400" />
                ) : (
                  <Swords className="w-8 h-8 text-rose-400 animate-pulse" />
                )}
              </div>
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                  {territory.grammarCategory}
                </span>
                <h2 className="font-cinzel text-2xl font-black text-amber-100 tracking-wide">
                  {territory.name} {territory.alias ? `— ${territory.alias}` : ''}
                </h2>
                <p className="text-xs text-amber-200/80 italic">
                  Topic: {territory.topic}
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setActiveTab('command')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold font-cinzel transition-all ${
                  activeTab === 'command'
                    ? 'bg-amber-600 text-slate-950 shadow-md'
                    : 'bg-slate-900/80 text-amber-300 hover:bg-slate-800'
                }`}
              >
                <Swords className="w-4 h-4" /> War Command
              </button>
              <button
                onClick={() => setActiveTab('study')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold font-cinzel transition-all ${
                  activeTab === 'study'
                    ? 'bg-amber-600 text-slate-950 shadow-md'
                    : 'bg-slate-900/80 text-amber-300 hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-4 h-4" /> Topic Study Guide
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
            {activeTab === 'command' ? (
              <>
                {/* Territory Description */}
                <div className="bg-slate-900/60 border border-amber-900/50 rounded-xl p-4">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                    Territory Intelligence
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {territory.description}
                  </p>
                </div>

                {/* Status & Control Meter */}
                <div className="bg-slate-900/60 border border-amber-900/50 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-amber-200">Enemy Control Status</span>
                    <span
                      className={
                        territory.enemyControl > 50
                          ? 'text-rose-400'
                          : territory.enemyControl > 0
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }
                    >
                      {territory.enemyControl === 0
                        ? 'CONQUERED (100% Student Control)'
                        : `${territory.enemyControl}% Enemy Resistance`}
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
                    <div
                      className={`h-full transition-all duration-500 ${
                        territory.enemyControl > 50
                          ? 'bg-gradient-to-r from-rose-600 to-red-500'
                          : territory.enemyControl > 0
                          ? 'bg-gradient-to-r from-amber-600 to-yellow-400'
                          : 'bg-gradient-to-r from-emerald-600 to-green-400'
                      }`}
                      style={{ width: `${territory.enemyControl}%` }}
                    />
                  </div>
                </div>

                {/* Victory Rewards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-amber-950/40 border border-amber-600/40 rounded-xl p-3 flex items-center gap-3">
                    <Award className="w-8 h-8 text-amber-400" />
                    <div>
                      <span className="text-[10px] text-amber-300/70 uppercase">XP Bounty</span>
                      <p className="font-mono font-bold text-sm text-amber-200">
                        +{territory.xpReward} XP
                      </p>
                    </div>
                  </div>
                  <div className="bg-yellow-950/40 border border-yellow-600/40 rounded-xl p-3 flex items-center gap-3">
                    <Award className="w-8 h-8 text-yellow-400" />
                    <div>
                      <span className="text-[10px] text-yellow-300/70 uppercase">Gold Booty</span>
                      <p className="font-mono font-bold text-sm text-yellow-200">
                        +{territory.coinsReward} Coins
                      </p>
                    </div>
                  </div>
                </div>

                {/* Warning for Locked Capital */}
                {isCapital && isLocked && (
                  <div className="bg-amber-950/80 border border-amber-500 rounded-xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-200 leading-relaxed">
                      <strong>CAPITAL LOCKED:</strong> Centralia requires defeating at least 70% of outer territory defenses across Grammaria before the gates open!
                    </p>
                  </div>
                )}
              </>
            ) : (
              /* Study Guide Tab */
              <div className="space-y-4">
                <div className="bg-slate-900/80 border border-amber-900/60 rounded-xl p-4">
                  <h3 className="font-cinzel text-sm font-bold text-amber-300 mb-2">
                    Core Grammar Rule
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    {territory.studyGuide.summary}
                  </p>
                </div>

                <div className="bg-slate-900/80 border border-amber-900/60 rounded-xl p-4">
                  <h3 className="font-cinzel text-sm font-bold text-amber-300 mb-2">
                    Key Tactical Rules
                  </h3>
                  <ul className="space-y-2">
                    {territory.studyGuide.keyRules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900/80 border border-amber-900/60 rounded-xl p-4">
                  <h3 className="font-cinzel text-sm font-bold text-amber-300 mb-2">
                    Battlefield Examples
                  </h3>
                  {territory.studyGuide.examples.map((ex, idx) => (
                    <div key={idx} className="text-xs space-y-1 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                      <p className="text-emerald-300 font-medium">
                        ✓ <span className="underline">Correct:</span> {ex.correct}
                      </p>
                      <p className="text-rose-400/80 font-medium">
                        ✗ <span className="line-through">Incorrect:</span> {ex.incorrect}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Action Bar */}
          <div className="p-4 bg-slate-950 border-t border-amber-600/40 flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-900 text-xs font-bold transition"
            >
              Close
            </button>

            {!isLocked && (
              <button
                onClick={() => {
                  onClose();
                  onStartAttack(territory);
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-slate-950 font-cinzel font-black text-sm tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:scale-105 transition-all"
              >
                <Swords className="w-5 h-5" /> LAUNCH ATTACK
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
