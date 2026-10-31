"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Coins, Gem, ChevronDown, Crown, UserRound } from "lucide-react";
import { PlayerState } from "@/types/game";
import { LogoutButton } from "@/components/LogoutButton";

interface HeaderHUDProps {
  player: PlayerState;
  onOpenProfile: () => void;
  onOpenRewards: () => void;
}

export function HeaderHUD({ player, onOpenProfile, onOpenRewards }: HeaderHUDProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  function openProfile() {
    setMenuOpen(false);
    onOpenProfile();
  }

  return (
    <header className="command-header">
      <div className="game-brand"><Crown aria-hidden="true" /><div><h1>Grammaria</h1><p>Conquer knowledge. Rule grammar.</p></div></div>
      <div className="command-header__center"><span className="status-dot" /> Your campaign continues</div>
      <div className="commander-resources" aria-label="Commander resources">
        <span><Coins aria-hidden="true" /><strong>{player.coins.toLocaleString()}</strong><small>Gold</small></span>
        <button onClick={onOpenRewards} aria-label={`${player.gems} gems. Open daily treasure`}><Gem aria-hidden="true" /><strong>{player.gems.toLocaleString()}</strong><small>Gems</small></button>
      </div>
      <div className="commander-menu" ref={menuRef}>
        <button onClick={() => setMenuOpen((open) => !open)} className="commander-button" aria-label={`Open account menu for ${player.name}`} aria-haspopup="menu" aria-expanded={menuOpen}>
          <span className="commander-button__portrait"><Image src="/commander-arjun.png" width={48} height={64} alt="" /><small>{player.level}</small></span>
          <span><strong>{player.name}</strong><small>{player.className}</small></span><ChevronDown className={menuOpen ? "is-open" : ""} aria-hidden="true" />
        </button>
        {menuOpen && <div className="commander-dropdown" role="menu">
          <div className="commander-dropdown__identity"><small>Student portal</small><strong>{player.name}</strong><span>{player.className} · Level {player.level}</span></div>
          <button role="menuitem" onClick={openProfile}><UserRound /> View commander profile</button>
          <LogoutButton className="commander-dropdown__logout" label="Logout and switch account" />
        </div>}
      </div>
    </header>
  );
}
