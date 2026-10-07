"use client";

import React, { useState } from 'react';
import { WorldMap } from '@/components/WorldMap';
import { HeaderHUD } from '@/components/HeaderHUD';
import { SidebarActions } from '@/components/SidebarActions';
import { TerritoryModal } from '@/components/modals/TerritoryModal';
import { AttackModal } from '@/components/modals/AttackModal';
import { DailyChallengeModal } from '@/components/modals/DailyChallengeModal';
import { DailyRewardModal } from '@/components/modals/DailyRewardModal';
import { LeaderboardModal } from '@/components/modals/LeaderboardModal';
import { EventsModal } from '@/components/modals/EventsModal';
import { ProfileModal } from '@/components/modals/ProfileModal';
import { INITIAL_PLAYER, INITIAL_TERRITORIES } from '@/data/territories';
import { Territory, PlayerState } from '@/types/game';

export default function Home() {
  const [player, setPlayer] = useState<PlayerState>(INITIAL_PLAYER);
  const [territories, setTerritories] = useState<Territory[]>(INITIAL_TERRITORIES);

  // Active Modals
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);
  const [attackTerritory, setAttackTerritory] = useState<Territory | null>(null);
  const [isDailyChallengeOpen, setIsDailyChallengeOpen] = useState(false);
  const [isDailyRewardOpen, setIsDailyRewardOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Handle Territory Click from Map
  const handleSelectTerritory = (t: Territory) => {
    setSelectedTerritory(t);
  };

  // Handle Launching Attack Session
  const handleStartAttack = (t: Territory) => {
    setAttackTerritory(t);
  };

  // Handle Successful Territory Capture
  const handleTerritoryCaptured = (territoryId: string, xpEarned: number, coinsEarned: number) => {
    setTerritories(prev =>
      prev.map(t =>
        t.id === territoryId
          ? { ...t, status: 'captured', enemyControl: 0 }
          : t
      )
    );

    setPlayer(prev => {
      const newXp = prev.xp + xpEarned;
      const newCapturedCount = prev.capturedTerritoriesCount + 1;
      let newLevel = prev.level;
      let newMaxXp = prev.maxXp;

      if (newXp >= newMaxXp) {
        newLevel += 1;
        newMaxXp += 2000;
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        maxXp: newMaxXp,
        coins: prev.coins + coinsEarned,
        capturedTerritoriesCount: newCapturedCount,
      };
    });
  };

  // Handle Rewards from Daily Quest or Chest
  const handleClaimXP = (amount: number) => {
    setPlayer(prev => ({
      ...prev,
      xp: prev.xp + amount,
    }));
  };

  const handleClaimRewardCoins = (coins: number, gems: number) => {
    setPlayer(prev => ({
      ...prev,
      coins: prev.coins + coins,
      gems: prev.gems + gems,
    }));
  };

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans select-none">
      {/* Fixed Top HUD */}
      <HeaderHUD
        player={player}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Fixed Left Sidebar Actions */}
      <SidebarActions
        onOpenDailyChallenge={() => setIsDailyChallengeOpen(true)}
        onOpenDailyReward={() => setIsDailyRewardOpen(true)}
        onOpenEvents={() => setIsEventsOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
      />

      {/* Main Interactive Fantasy World Map Canvas */}
      <WorldMap
        territories={territories}
        onSelectTerritory={handleSelectTerritory}
      />

      {/* Territory Detail & War Command Modal */}
      <TerritoryModal
        territory={selectedTerritory}
        onClose={() => setSelectedTerritory(null)}
        onStartAttack={handleStartAttack}
      />

      {/* Live Interactive Attack Battle Session Modal */}
      <AttackModal
        territory={attackTerritory}
        onClose={() => setAttackTerritory(null)}
        onTerritoryCaptured={handleTerritoryCaptured}
      />

      {/* Daily Challenge Modal */}
      {isDailyChallengeOpen && (
        <DailyChallengeModal
          onClose={() => setIsDailyChallengeOpen(false)}
          onClaimXP={handleClaimXP}
        />
      )}

      {/* Daily Reward Modal */}
      {isDailyRewardOpen && (
        <DailyRewardModal
          onClose={() => setIsDailyRewardOpen(false)}
          onClaimRewards={handleClaimRewardCoins}
        />
      )}

      {/* Leaderboard Modal */}
      {isLeaderboardOpen && (
        <LeaderboardModal onClose={() => setIsLeaderboardOpen(false)} />
      )}

      {/* Events / Assaults Modal */}
      {isEventsOpen && (
        <EventsModal onClose={() => setIsEventsOpen(false)} />
      )}

      {/* Commander Profile Modal */}
      {isProfileOpen && (
        <ProfileModal
          player={player}
          onClose={() => setIsProfileOpen(false)}
        />
      )}
    </main>
  );
}
