"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, BookOpen, BrainCircuit, Check, ChevronRight, Crown, Flame, Gem, Map, ShieldCheck, Sparkles, Swords, X } from "lucide-react";
import { PlayerState } from "@/types/game";

interface ProfileModalProps { player: PlayerState; onClose: () => void; }

export const ProfileModal: React.FC<ProfileModalProps> = ({ player, onClose }) => {
  const [view, setView] = useState<"record" | "mastery">("record");
  const xpPercent = Math.min(100, Math.round((player.xp / player.maxXp) * 100));
  const realmPercent = Math.round((player.capturedTerritoriesCount / player.totalTerritories) * 100);

  return (
    <div className="commander-hall" role="dialog" aria-modal="true" aria-label={`${player.name} commander profile`}>
      <Image src="/map-bg-ornate.jpg" alt="" width={1728} height={910} sizes="100vw" className="commander-hall__map" />
      <div className="commander-hall__shade" />
      <div className="commander-hall__rays" />
      <button type="button" onClick={onClose} className="commander-hall__close"><X /><span>Return to map</span></button>

      <motion.div className="commander-hero" initial={{ x: 120, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 65, damping: 18 }}>
        <div className="commander-hero__halo" />
        <Image src="/commander-arjun.png" alt="Arjun Verma, commander of Grammaria" width={1024} height={1536} priority sizes="(max-width: 850px) 65vw, 42vw" />
      </motion.div>

      <main className="commander-dossier">
        <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="commander-rank"><Crown /><span>{player.level}</span></div>
          <div><small>Royal academy · Commander profile</small><h2>{player.name}</h2><p>{player.className} · Warden of the Western Realms</p></div>
        </motion.header>

        <motion.section className="commander-progress" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .12 }}>
          <div className="commander-progress__top"><span>Level {player.level} progress</span><strong>{player.xp.toLocaleString()} / {player.maxXp.toLocaleString()} XP</strong></div>
          <div className="commander-progress__track"><motion.span initial={{ width: 0 }} animate={{ width: `${xpPercent}%` }} transition={{ delay: .35, duration: .8 }} /></div>
          <div className="commander-progress__next"><Sparkles /> {player.maxXp - player.xp} XP until the next command rank</div>
        </motion.section>

        <motion.div className="commander-tabs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }}>
          <button type="button" onClick={() => setView("record")} className={view === "record" ? "is-active" : ""}><Swords /> Campaign Record</button>
          <button type="button" onClick={() => setView("mastery")} className={view === "mastery" ? "is-active" : ""}><BookOpen /> Grammar Mastery</button>
        </motion.div>

        <AnimatePresence mode="wait">
          {view === "record" ? (
            <motion.section key="record" className="commander-panel" initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }}>
              <div className="commander-stats">
                <article><span><ShieldCheck /></span><div><small>Realms secured</small><strong>{player.capturedTerritoriesCount}<em> / {player.totalTerritories}</em></strong></div></article>
                <article><span><Flame /></span><div><small>Learning streak</small><strong>{player.streak}<em> days</em></strong></div></article>
                <article><span><Award /></span><div><small>Battle accuracy</small><strong>88.4<em>%</em></strong></div></article>
              </div>
              <div className="realm-conquest"><div className="realm-conquest__ring" style={{ "--realm-progress": `${realmPercent * 3.6}deg` } as React.CSSProperties}><strong>{realmPercent}%</strong><small>conquered</small></div><div><small>Grammaria campaign</small><h3>The road to Centralia</h3><p>{player.totalTerritories - player.capturedTerritoriesCount} territories remain before the capital gates can be challenged.</p><button type="button" onClick={onClose}>Continue campaign <ChevronRight /></button></div></div>
              <div className="commander-honors"><small>Recent honors</small><div><span><Map /> Cartographer</span><span><Flame /> Five-day flame</span><span><Gem /> Article master</span></div></div>
            </motion.section>
          ) : (
            <motion.section key="mastery" className="commander-panel" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }}>
              <div className="academy-insight"><BrainCircuit /><div><small>Academy insight</small><p>Arjun commands the fundamentals with confidence. Focused training in conditional timelines and reported speech will open the safest route toward Centralia.</p></div></div>
              <div className="mastery-columns">
                <div><h3><Check /> Strong commands</h3>{player.strongTopics.map((topic, index) => <div className="mastery-row" key={topic}><span>{topic}</span><div><i style={{ width: `${92 - index * 6}%` }} /></div><strong>{92 - index * 6}%</strong></div>)}</div>
                <div><h3><Swords /> Next targets</h3>{player.weakTopics.map((topic, index) => <div className="mastery-target" key={topic}><span>{index + 1}</span><div><strong>{topic}</strong><small>Recommended training</small></div><ChevronRight /></div>)}</div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
