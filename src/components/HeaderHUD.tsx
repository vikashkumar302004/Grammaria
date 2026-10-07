"use client";

import React from "react";
import { PlayerState } from "@/types/game";
import { Coins, Gem, Menu, Plus } from "lucide-react";

interface HeaderHUDProps {
  player: PlayerState;
  onOpenProfile: () => void;
  onOpenMenu?: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({ player, onOpenProfile, onOpenMenu }) => {
  const xpPercent = Math.min(100, Math.round((player.xp / player.maxXp) * 100));

  return (
    <header className="map-hud pointer-events-none fixed inset-x-0 top-0 z-30 flex items-start justify-between px-3 py-2.5 sm:px-5">
      <button
        type="button"
        onClick={onOpenProfile}
        className="profile-cartouche pointer-events-auto group"
        aria-label={`Open commander profile for ${player.name}`}
      >
        <span className="profile-cartouche__portrait" aria-hidden="true">
          <span>AV</span><small>{player.level}</small>
        </span>
        <span className="profile-cartouche__copy">
          <span className="profile-cartouche__name">{player.name}</span>
          <span className="profile-cartouche__class">{player.className}</span>
          <span className="profile-cartouche__xp">
            <span style={{ width: `${xpPercent}%` }} />
            <em>XP {player.xp.toLocaleString()} / {player.maxXp.toLocaleString()}</em>
          </span>
        </span>
        {onOpenMenu && (
          <span role="button" tabIndex={0} onClick={(event) => { event.stopPropagation(); onOpenMenu(); }} className="profile-cartouche__menu" aria-label="Open menu">
            <Menu />
          </span>
        )}
      </button>

      <div className="title-scroll hidden md:block" aria-label="Grammaria — Conquer knowledge, rule grammar">
        <span className="title-scroll__cap title-scroll__cap--left" />
        <div><h1>Grammaria</h1><p>Conquer knowledge · Rule grammar</p></div>
        <span className="title-scroll__cap title-scroll__cap--right" />
      </div>

      <div className="map-purse pointer-events-auto">
        <div className="map-purse__item map-purse__item--coin" title="Coins">
          <span className="map-purse__seal"><Coins /></span><strong>{player.coins.toLocaleString()}</strong>
        </div>
        <div className="map-purse__divider" />
        <div className="map-purse__item map-purse__item--gem" title="Gems">
          <Gem /><strong>{player.gems.toLocaleString()}</strong>
          <button type="button" aria-label="Get more gems"><Plus /></button>
        </div>
      </div>
    </header>
  );
};
