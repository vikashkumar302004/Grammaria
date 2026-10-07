"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, BookOpen, Check, ChevronRight, Clock3, Coins, ScrollText, ShieldCheck, Sparkles, Swords, Trophy } from "lucide-react";
import { Territory } from "@/types/game";

interface SpecialTerritoryViewProps {
  territory: Territory;
  onClose: () => void;
  onStartAttack: (territory: Territory) => void;
}

const territoryTheme = {
  artikel: {
    image: "/territory-artikel.png",
    guide: "/guide-archivist.png",
    guideName: "Lady Aurelia",
    guideTitle: "High Archivist",
    kicker: "The golden scholar isles",
    intro: "Every noun seeks its rightful banner. Master A, An and The to keep the isles in perfect order.",
    accent: "gold",
    icon: ScrollText,
    dialogue: [
      "Commander Arjun, the Article Isles have been expecting you.",
      "A, An and The may be small banners—but choose the wrong one, and the meaning of an entire sentence changes.",
    ],
  },
  temporalia: {
    image: "/territory-temporalia.png",
    guide: "/guide-timekeeper.png",
    guideName: "Master Caelum",
    guideTitle: "Keeper of Hours",
    kicker: "The kingdom beyond time",
    intro: "Past, present and future flow through the great clock. Command every tense and restore the timeline.",
    accent: "blue",
    icon: Clock3,
    dialogue: [
      "You have crossed into Temporalia, Commander. Here, every action leaves an echo in time.",
      "Master the past, command the present, and the future path will reveal itself.",
    ],
  },
} as const;

export function SpecialTerritoryView({ territory, onClose, onStartAttack }: SpecialTerritoryViewProps) {
  const [section, setSection] = useState<"overview" | "academy">("overview");
  const [dialogueStep, setDialogueStep] = useState(0);
  const theme = territoryTheme[territory.id as keyof typeof territoryTheme];
  if (!theme) return null;
  const Crest = theme.icon;

  return (
    <AnimatePresence>
      <motion.div className={`territory-screen territory-screen--${theme.accent}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Image src={theme.image} alt={`Fantasy landscape of ${territory.name}`} fill priority sizes="100vw" className="territory-screen__art" />
        <div className="territory-screen__shade" />
        <div className="territory-screen__mist territory-screen__mist--one" />
        <div className="territory-screen__mist territory-screen__mist--two" />

        <motion.div
          className="territory-guide"
          initial={{ x: 150, opacity: 0, scale: .94 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 75, damping: 18, delay: .15 }}
        >
          <div className="territory-guide__aura" />
          <Image src={theme.guide} alt={`${theme.guideName}, ${theme.guideTitle}`} width={1024} height={1536} priority sizes="(max-width: 820px) 55vw, 38vw" className="territory-guide__image" />
        </motion.div>

        <motion.button type="button" onClick={onClose} className="territory-back" initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <ArrowLeft /> <span>World Map</span>
        </motion.button>

        <div className={`territory-screen__content ${dialogueStep < theme.dialogue.length ? "is-introducing" : ""}`}>
          <motion.header initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .1 }}>
            <div className="territory-crest"><Crest /><span className="territory-crest__ring" /></div>
            <p>{theme.kicker}</p>
            <h2>{territory.name}</h2>
            <span className="territory-alias">{territory.alias}</span>
            <div className="territory-status"><ShieldCheck /> Territory secured · Level {territory.levelRequired}</div>
          </motion.header>

          <motion.div className="territory-command" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: dialogueStep >= theme.dialogue.length ? 1 : .2 }} transition={{ delay: .2 }}>
            <nav>
              <button type="button" onClick={() => setSection("overview")} className={section === "overview" ? "is-active" : ""}><Sparkles /> Overview</button>
              <button type="button" onClick={() => setSection("academy")} className={section === "academy" ? "is-active" : ""}><BookOpen /> Academy</button>
            </nav>

            <AnimatePresence mode="wait">
              {section === "overview" ? (
                <motion.div key="overview" className="territory-pane" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}>
                  <p className="territory-intro">{theme.intro}</p>
                  <div className="territory-objective">
                    <span><Trophy /></span>
                    <div><small>Mastery mission</small><strong>{territory.topic}</strong><p>{territory.description}</p></div>
                  </div>
                  <div className="territory-rewards">
                    <div><Sparkles /><span><small>Victory XP</small><strong>+{territory.xpReward}</strong></span></div>
                    <div><Coins /><span><small>Gold reward</small><strong>+{territory.coinsReward}</strong></span></div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="academy" className="territory-pane" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
                  <p className="territory-intro">{territory.studyGuide.summary}</p>
                  <div className="territory-rules">
                    {territory.studyGuide.keyRules.map((rule, index) => <div key={rule}><span>{index + 1}</span><p>{rule}</p></div>)}
                  </div>
                  {territory.studyGuide.examples[0] && <div className="territory-example"><Check /><span><small>Scout&apos;s example</small>{territory.studyGuide.examples[0].correct}</span></div>}
                </motion.div>
              )}
            </AnimatePresence>

            <button type="button" className="territory-cta" onClick={() => { onClose(); onStartAttack(territory); }}>
              <span><Swords /> Begin Training</span><ChevronRight />
            </button>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {dialogueStep < theme.dialogue.length && (
            <motion.div
              key={dialogueStep}
              className="guide-dialogue"
              initial={{ opacity: 0, y: 24, scale: .97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: .28 }}
            >
              <div className="guide-dialogue__speaker">
                <span>{theme.guideName}</span>
                <small>{theme.guideTitle}</small>
              </div>
              <p>{theme.dialogue[dialogueStep]}</p>
              <div className="guide-dialogue__actions">
                <button type="button" onClick={() => setDialogueStep(theme.dialogue.length)} className="guide-dialogue__skip">Skip</button>
                <button type="button" onClick={() => setDialogueStep((step) => step + 1)} className="guide-dialogue__next">
                  {dialogueStep === theme.dialogue.length - 1 ? "Enter Academy" : "Continue"}<ChevronRight />
                </button>
              </div>
              <span className="guide-dialogue__tail" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="territory-screen__hint">Click academy to inspect the grammar scrolls</span>
      </motion.div>
    </AnimatePresence>
  );
}
