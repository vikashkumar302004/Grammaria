"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Territory } from "@/types/game";
import { Crown, LockKeyhole, ShieldCheck, Swords } from "lucide-react";

interface WorldMapProps {
  territories: Territory[];
  onSelectTerritory: (territory: Territory) => void;
}

const statusCopy: Record<Territory["status"], string> = {
  captured: "Conquered",
  accessible: "Open frontier",
  "enemy-controlled": "Enemy held",
  "capital-locked": "Locked capital",
  locked: "Locked",
};

function StatusMark({ status }: { status: Territory["status"] }) {
  const iconClass = "h-[0.9em] w-[0.9em] stroke-[2.2]";

  if (status === "captured") return <ShieldCheck className={iconClass} />;
  if (status === "enemy-controlled") return <Swords className={iconClass} />;
  if (status === "capital-locked") return <Crown className={iconClass} />;
  if (status === "locked") return <LockKeyhole className={iconClass} />;
  return <span className="map-label__diamond" aria-hidden="true" />;
}

export const WorldMap: React.FC<WorldMapProps> = ({ territories, onSelectTerritory }) => {
  const [hoveredTerritory, setHoveredTerritory] = useState<Territory | null>(null);

  return (
    <section
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#100b07]"
      aria-label="Interactive map of Grammaria"
    >
      <div className="map-canvas relative aspect-[16/9] w-full max-w-[1920px] overflow-hidden">
        <Image
          src="/map-bg-ornate.jpg"
          alt="Illustrated fantasy map of the realm of Grammaria"
          fill
          priority
          sizes="100vw"
          className="select-none object-cover object-center"
        />

        <div className="map-vignette absolute inset-0 pointer-events-none" />

        {territories.map((territory) => (
          <div
            key={territory.id}
            style={{ left: `${territory.x}%`, top: `${territory.y}%` }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          >
            <button
              type="button"
              onClick={() => onSelectTerritory(territory)}
              onPointerEnter={() => setHoveredTerritory(territory)}
              onPointerLeave={() => setHoveredTerritory(null)}
              onFocus={() => setHoveredTerritory(territory)}
              onBlur={() => setHoveredTerritory(null)}
              className={`map-label map-label--${territory.status}`}
              aria-label={`${territory.name}, ${territory.topic}. ${statusCopy[territory.status]}`}
            >
              <span className="map-label__name">
                <span className="map-label__status" aria-hidden="true">
                  <StatusMark status={territory.status} />
                </span>
                {territory.name}
              </span>
              <span className="map-label__rule" aria-hidden="true" />
              <span className="map-label__alias">{territory.alias}</span>
            </button>
          </div>
        ))}

        <div
          className={`map-inscription ${hoveredTerritory ? "map-inscription--visible" : ""}`}
          aria-hidden={!hoveredTerritory}
        >
          {hoveredTerritory && (
            <>
              <span className="map-inscription__eyebrow">
                {statusCopy[hoveredTerritory.status]} · Level {hoveredTerritory.levelRequired}
              </span>
              <strong>{hoveredTerritory.topic}</strong>
              <span>
                {hoveredTerritory.xpReward} XP · {hoveredTerritory.coinsReward} coins · Click to explore
              </span>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
