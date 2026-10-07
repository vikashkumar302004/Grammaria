"use client";

import React, { useState } from 'react';
import { Territory, GrammarQuestion } from '@/types/game';
import { X, Swords, ShieldAlert, CheckCircle, XCircle, Award, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface AttackModalProps {
  territory: Territory | null;
  onClose: () => void;
  onTerritoryCaptured: (territoryId: string, xpEarned: number, coinsEarned: number) => void;
}

export const AttackModal: React.FC<AttackModalProps> = ({
  territory,
  onClose,
  onTerritoryCaptured,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [enemyHealth, setEnemyHealth] = useState(territory?.enemyControl || 80);
  const [sessionXP, setSessionXP] = useState(0);
  const [sessionCoins, setSessionCoins] = useState(0);
  const [isVictorious, setIsVictorious] = useState(false);

  if (!territory) return null;

  const currentQuestion: GrammarQuestion = territory.sampleQuestions[currentQuestionIndex] || {
    id: "q-default",
    questionText: `Choose the correct grammar form for ${territory.topic}:`,
    options: [
      `Correct grammar form for ${territory.name}`,
      `Incorrect option A`,
      `Incorrect option B`,
      `Incorrect option C`
    ],
    correctAnswerIndex: 0,
    explanation: `Grammar rule for ${territory.topic}.`,
    difficulty: "Medium",
    attackPower: 40
  };

  const handleFireAttack = () => {
    if (selectedOption === null) return;

    const correct = selectedOption === currentQuestion.correctAnswerIndex;
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      const damage = currentQuestion.attackPower || 35;
      const newHealth = Math.max(0, enemyHealth - damage);
      setEnemyHealth(newHealth);

      const xpGained = territory.xpReward / 2;
      const coinsGained = territory.coinsReward / 2;
      setSessionXP(prev => prev + xpGained);
      setSessionCoins(prev => prev + coinsGained);

      if (newHealth === 0) {
        setIsVictorious(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        onTerritoryCaptured(territory.id, territory.xpReward, territory.coinsReward);
      }
    }
  };

  const handleNextQuestion = () => {
    if (isVictorious) {
      onClose();
      return;
    }
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setCurrentQuestionIndex(prev => (prev + 1) % territory.sampleQuestions.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-slate-950 border-2 border-amber-600/80 rounded-2xl shadow-[0_0_60px_rgba(245,158,11,0.2)] overflow-hidden text-slate-100"
        >
          {/* Top Battle HUD */}
          <div className="p-4 bg-slate-900 border-b border-amber-600/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Swords className="w-6 h-6 text-rose-500 animate-pulse" />
              <div>
                <span className="text-[10px] text-amber-400 font-mono uppercase tracking-widest">
                  ACTIVE BATTLE — {territory.name}
                </span>
                <h3 className="font-cinzel font-black text-lg text-amber-100">
                  Target: Reduce Enemy Resistance to 0%
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-amber-400/60 hover:text-amber-200 p-1.5 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Enemy Control Health Bar */}
          <div className="px-6 pt-4 pb-2 bg-slate-950">
            <div className="flex justify-between items-center text-xs font-bold mb-1">
              <span className="text-amber-200">Enemy Defense Meter</span>
              <span className="text-rose-400">{enemyHealth}% Remaining</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-4 overflow-hidden border border-amber-900/60 p-0.5 relative">
              <motion.div
                className="bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 h-full rounded-full shadow-[0_0_10px_rgba(239,68,68,0.7)]"
                animate={{ width: `${enemyHealth}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Question & Attack Area */}
          <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
            {isVictorious ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-20 h-20 mx-auto bg-amber-500/20 border-2 border-amber-400 rounded-full flex items-center justify-center animate-bounce">
                  <Sparkles className="w-10 h-10 text-amber-300" />
                </div>
                <h2 className="font-cinzel text-3xl font-black text-amber-200 tracking-wide">
                  TERRITORY CAPTURED!
                </h2>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  You have broken {territory.name}&apos;s defenses! This realm is now under student conquest.
                </p>
                <div className="flex justify-center gap-6 text-sm font-bold pt-2">
                  <span className="text-amber-400 bg-amber-950/60 px-4 py-2 rounded-xl border border-amber-500/40">
                    +{territory.xpReward} XP Earned
                  </span>
                  <span className="text-yellow-400 bg-yellow-950/60 px-4 py-2 rounded-xl border border-yellow-500/40">
                    +{territory.coinsReward} Coins Earned
                  </span>
                </div>
              </div>
            ) : (
              <>
                {/* Question Box */}
                <div className="bg-slate-900/80 border border-amber-700/50 rounded-xl p-5 shadow-inner">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-amber-400 uppercase bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/40">
                      Grammar Strike #{currentQuestionIndex + 1}
                    </span>
                    <span className="text-[10px] font-bold text-rose-400">
                      Attack Power: -{currentQuestion.attackPower}% Defense
                    </span>
                  </div>
                  <h4 className="font-sans text-base font-semibold text-slate-100 leading-snug">
                    {currentQuestion.questionText}
                  </h4>
                </div>

                {/* Multiple Choice Options */}
                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options.map((optionText, idx) => {
                    const isSelected = selectedOption === idx;
                    let btnStyle = "bg-slate-900/90 border-slate-700 text-slate-200 hover:border-amber-500/60";

                    if (isAnswered) {
                      if (idx === currentQuestion.correctAnswerIndex) {
                        btnStyle = "bg-emerald-950/90 border-emerald-500 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.4)]";
                      } else if (isSelected) {
                        btnStyle = "bg-rose-950/90 border-rose-500 text-rose-100 shadow-[0_0_15px_rgba(239,68,68,0.4)]";
                      }
                    } else if (isSelected) {
                      btnStyle = "bg-amber-950/90 border-amber-400 text-amber-100 ring-2 ring-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]";
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => setSelectedOption(idx)}
                        className={`w-full text-left p-4 rounded-xl border-2 font-medium text-sm transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{optionText}</span>
                        {isAnswered && idx === currentQuestion.correctAnswerIndex && (
                          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        )}
                        {isAnswered && isSelected && idx !== currentQuestion.correctAnswerIndex && (
                          <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Answer Feedback & Explanation */}
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl border ${
                      isCorrect
                        ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-500/50 text-rose-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm mb-1">
                      {isCorrect ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <span>SUCCESSFUL ATTACK! Enemy defense damaged!</span>
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="w-5 h-5 text-rose-400" />
                          <span>ATTACK BLOCKED! The enemy parried your move.</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs italic text-slate-300">
                      {currentQuestion.explanation}
                    </p>
                  </motion.div>
                )}
              </>
            )}
          </div>

          {/* Action Bar */}
          <div className="p-4 bg-slate-900 border-t border-amber-600/40 flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-bold"
            >
              Retreat
            </button>

            {isVictorious ? (
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-cinzel font-black text-sm shadow-lg hover:scale-105 transition"
              >
                RETURN TO MAP
              </button>
            ) : !isAnswered ? (
              <button
                disabled={selectedOption === null}
                onClick={handleFireAttack}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-slate-950 font-cinzel font-black text-sm tracking-wider shadow-lg hover:scale-105 transition disabled:opacity-50 disabled:pointer-events-none"
              >
                <Swords className="w-5 h-5" /> FIRE ATTACK
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-slate-950 font-cinzel font-black text-sm shadow-lg hover:scale-105 transition"
              >
                NEXT STRIKE <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
