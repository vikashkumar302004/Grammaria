"use client";

import React from "react";
import { Compass, Gift, Star, Target, Trophy } from "lucide-react";

interface SidebarActionsProps {
  onOpenDailyChallenge: () => void;
  onOpenDailyReward: () => void;
  onOpenEvents: () => void;
  onOpenLeaderboard: () => void;
}

const actions = [
  { label: "Daily Quest", icon: Target, notice: "2", tone: "red" },
  { label: "Reward", icon: Gift, notice: "", tone: "gold" },
  { label: "Assaults", icon: Star, notice: "1", tone: "violet" },
  { label: "Ranking", icon: Trophy, notice: "", tone: "gold" },
] as const;

export const SidebarActions: React.FC<SidebarActionsProps> = ({ onOpenDailyChallenge, onOpenDailyReward, onOpenEvents, onOpenLeaderboard }) => {
  const callbacks = [onOpenDailyChallenge, onOpenDailyReward, onOpenEvents, onOpenLeaderboard];
  return (
    <>
      <nav className="map-actions fixed left-2 top-[5.8rem] z-20 flex flex-col sm:left-4" aria-label="Map actions">
        {actions.map(({ label, icon: Icon, notice, tone }, index) => (
          <button key={label} type="button" onClick={callbacks[index]} className={`map-action map-action--${tone}`} aria-label={label}>
            <span className="map-action__seal"><Icon /></span>
            <span className="map-action__label">{label}</span>
            {notice && <span className="map-action__notice">{notice}</span>}
          </button>
        ))}
      </nav>
      <div className="map-compass pointer-events-none fixed bottom-3 left-3 z-10 hidden sm:flex" aria-hidden="true">
        <Compass /><span>N</span>
      </div>
    </>
  );
};
