"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/src/lib/cn";
import { handleInternalClick } from "@/src/lib/nav";
import { sectionPath, type TabId } from "@/src/data/sections";
import { ListHeader } from "./GtaUi";

interface Tile {
  id: TabId;
  label: string;
  image: string;
}

const tiles: Tile[] = [
  { id: "missions", label: "PROJECTS", image: "/images/jm/gta/tile-projects.webp" },
  { id: "automation", label: "AUTOMATION", image: "/images/jm/gta/tile-automation.webp" },
  { id: "profile", label: "PROFILE", image: "/images/jm/gta/tile-profile.webp" },
  { id: "crew", label: "ROLES", image: "/images/jm/gta/tile-roles.webp" },
];

interface TileGridProps {
  onTileClick: (tabId: TabId) => void;
}

export default function TileGrid({ onTileClick }: TileGridProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [hovered, setHovered] = useState<string | null>(null);

  const handleImageError = (tileId: string) => {
    setImageErrors((prev) => ({ ...prev, [tileId]: true }));
  };

  return (
    <nav aria-label="Explore">
      <ListHeader>Explore</ListHeader>
      <div className="mt-[2px] grid grid-cols-2 lg:grid-cols-4 gap-[2px]">
      {tiles.map((tile) => {
        const hasError = imageErrors[tile.id];
        return (
          <GameTile
            key={tile.id}
            tile={tile}
            hasError={hasError}
            onClick={() => onTileClick(tile.id)}
            onImageError={() => handleImageError(tile.id)}
            hovered={hovered}
            setHovered={setHovered}
          />
        );
      })}
      </div>
    </nav>
  );
}

function GameTile({
  tile,
  hasError,
  onClick,
  onImageError,
  hovered,
  setHovered,
}: {
  tile: Tile;
  hasError: boolean;
  onClick: () => void;
  onImageError: () => void;
  hovered: string | null;
  setHovered: (id: string | null) => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.a
      href={sectionPath(tile.id)}
      onClick={(e) => handleInternalClick(e, onClick)}
      onMouseEnter={() => setHovered(tile.id)}
      onMouseLeave={() => setHovered(null)}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              scale: 1.03,
              boxShadow: "0 0 24px rgba(94,234,212,0.35)",
            }
      }
      whileTap={prefersReducedMotion ? {} : { scale: 0.98, opacity: 0.95 }}
      className={cn(
        "relative block w-full h-24 sm:h-28 overflow-hidden glass-panel transition-all duration-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70",
        hovered === tile.id ? "shadow-[0_0_24px_rgba(52,211,153,0.45)]" : "shadow-[0_0_12px_rgba(0,0,0,0.45)]"
      )}
    >
      {!hasError ? (
        <motion.div
          className="absolute inset-0"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: hovered === tile.id ? 1.05 : 1,
                  x: hovered === tile.id ? -2 : 0,
                }
          }
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Image
            src={tile.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover"
            onError={onImageError}
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 via-black to-black" />
      )}

      {/* Gradient + overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-transparent" />
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top, rgba(255,255,255,0.12), transparent 45%)" }} />

      {/* Shine sweep */}
      <div
        className={cn(
          "absolute inset-0 translate-x-[-130%] rotate-12 bg-gradient-to-r from-transparent via-white/18 to-transparent",
          hovered === tile.id ? "animate-[shine_0.8s_ease]" : ""
        )}
      />

      {/* Scanline sweep on hover */}
      {hovered === tile.id && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/8 to-transparent animate-pulse-fast pointer-events-none" />
      )}

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 lg:p-4 z-10">
        <div className="flex items-center justify-between">
          <span className="font-hud text-base sm:text-lg font-semibold tracking-[0.1em] uppercase text-white drop-shadow-lg">
            {tile.label}
          </span>
          <svg
            className={cn(
              "w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white drop-shadow-lg transition-all",
              hovered === tile.id ? "opacity-100 translate-x-1" : "opacity-70"
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.a>
  );
}
