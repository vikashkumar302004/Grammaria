"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Crown, LockKeyhole, RotateCcw, ShieldAlert, Sparkles, Volume2, VolumeX, XCircle } from "lucide-react";
import { Territory } from "@/types/game";

interface CentraliaViewProps { territory: Territory; onClose: () => void; }

export function CentraliaView({ territory, onClose }: CentraliaViewProps) {
  const question = territory.sampleQuestions[0];
  const [selected, setSelected] = useState<number | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isAnswered = selected !== null;
  const isCorrect = selected === question.correctAnswerIndex;

  const speak = useCallback((text: string) => {
    if (!voiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find((voice) => voice.lang === "en-IN") ?? voices.find((voice) => voice.lang.startsWith("en")) ?? null;
    utterance.rate = .88;
    utterance.pitch = .72;
    utterance.volume = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [voiceEnabled]);

  useEffect(() => () => { if (typeof window !== "undefined") window.speechSynthesis?.cancel(); }, []);

  const intro = "So, Commander Arjun enters Centralia. The capital does not yield to strength. It yields only to precise thought.";
  const feedback = isCorrect
    ? `Correct. ${question.explanation} You recognized that an unreal past condition requires had plus the past participle, followed by would have plus the past participle.`
    : `Incorrect. Listen carefully. ${question.explanation} The event did not happen, so both parts must describe an unreal past result.`;

  const chooseAnswer = (index: number) => {
    if (isAnswered) return;
    setSelected(index);
    const correct = index === question.correctAnswerIndex;
    speak(correct
      ? `Correct, Commander. ${question.explanation}`
      : `That answer falls before the gates. ${question.explanation}`);
  };

  const resetTrial = () => { window.speechSynthesis?.cancel(); setIsSpeaking(false); setSelected(null); };

  return (
    <div className="centralia" role="dialog" aria-modal="true" aria-label="Centralia final capital trial">
      <Image src="/centralia-throne-hall.png" alt="The grand throne hall of Centralia" width={1672} height={936} priority sizes="100vw" className="centralia__hall" />
      <div className="centralia__veil" /><div className="centralia__storm" />
      <button type="button" className="centralia__back" onClick={onClose}><ArrowLeft /> World map</button>
      <button type="button" className="centralia__voice" onClick={() => { setVoiceEnabled((enabled) => !enabled); window.speechSynthesis?.cancel(); }} aria-label={voiceEnabled ? "Mute voice" : "Enable voice"}>{voiceEnabled ? <Volume2 /> : <VolumeX />}</button>

      <motion.div className={`grammarch ${isSpeaking ? "is-speaking" : ""}`} initial={{ x: 130, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 62, damping: 17 }}>
        <span className="grammarch__aura" />
        <Image src="/centralia-grammarch.png" alt="The Grammarch, masked ruler of Centralia" width={1024} height={1536} priority sizes="(max-width: 850px) 65vw, 38vw" />
      </motion.div>

      <main className="centralia__content">
        <motion.header initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }}>
          <div className="centralia__crest"><Crown /><span /></div>
          <div><small>Final capital · Audience chamber</small><h2>Centralia</h2><p>The Imperial Trial</p></div>
          <div className="centralia__lock"><LockKeyhole /><span><small>Capital status</small><strong>Gates sealed</strong></span></div>
        </motion.header>

        <motion.section className="grammarch-dialogue" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .15 }}>
          <div className="grammarch-dialogue__name"><strong>The Grammarch</strong><span>Sovereign of Syntax</span></div>
          <p>{isAnswered ? feedback : intro}</p>
          <button type="button" onClick={() => speak(isAnswered ? feedback : `${intro} ${question.questionText}`)}><Volume2 /> {isSpeaking ? "Speaking…" : isAnswered ? "Hear explanation" : "Hear challenge"}</button>
        </motion.section>

        <motion.section className="capital-trial" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .24 }}>
          <div className="capital-trial__heading"><span><Sparkles /> Trial of Synthesis</span><strong>Hard · 35 power</strong></div>
          <h3>{question.questionText}</h3>
          <div className="capital-trial__answers">
            {question.options.map((option, index) => {
              const correctOption = index === question.correctAnswerIndex;
              const chosen = selected === index;
              return <button type="button" key={option} disabled={isAnswered} onClick={() => chooseAnswer(index)} className={`${chosen ? "is-chosen" : ""} ${isAnswered && correctOption ? "is-correct" : ""} ${isAnswered && chosen && !correctOption ? "is-wrong" : ""}`}><span>{String.fromCharCode(65 + index)}</span><p>{option}</p>{isAnswered && correctOption && <CheckCircle2 />}{isAnswered && chosen && !correctOption && <XCircle />}</button>;
            })}
          </div>
          <AnimatePresence>
            {isAnswered && <motion.div className={`capital-trial__result ${isCorrect ? "is-correct" : "is-wrong"}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>{isCorrect ? <CheckCircle2 /> : <ShieldAlert />}<div><small>{isCorrect ? "The sovereign acknowledges your answer" : "The gates reject your answer"}</small><strong>{isCorrect ? "A precise strike" : "Study the timeline"}</strong><p>{question.explanation}</p></div><button type="button" onClick={resetTrial}><RotateCcw /> Try again</button></motion.div>}
          </AnimatePresence>
        </motion.section>
        <p className="centralia__requirement">Conquer 12 more outer realms to unlock the full siege of Centralia.</p>
      </main>
    </div>
  );
}
