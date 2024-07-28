import React, { useEffect, useRef, memo } from "react";
import "./PlayerRow.css";

interface PlayerProps {
  player: {
    userID: string;
    displayName: string;
    picture: string;
    score: number;
  };
  index: number;
  prevIndex: number;
}

const colors = [
  "#f7f9fc",
  "#e8f0f2",
  "#f2f1f6",
  "#f9f8f9",
  "#f2e9e4",
  "#f4f7f6",
  "#e8f8f5",
  "#f1f7f9",
  "#f8f9fb",
  "#f2f2f2",
];

const PlayerRow: React.FC<PlayerProps> = ({ player, index, prevIndex }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (row) {
      const positionChange = (prevIndex - index) * 50;
      row.style.transition = "none";
      row.style.transform = `translateY(${positionChange}px)`;
      requestAnimationFrame(() => {
        row.style.transition = "transform 0.5s ease-in-out";
        row.style.transform = "translateY(0)";
      });
    }
  }, [index, prevIndex]);

  return (
    <div
      ref={rowRef}
      className={`player-row ${index < 3 ? "top-player" : ""}`}
      style={{ backgroundColor: colors[index % colors.length] }}
    >
      <span className="player-rank">{index + 1}</span>
      <span className="player-userID">{player.userID}</span>
      <span className="player-name">{player.displayName}</span>
      <span className="player-score">{player.score}</span>
    </div>
  );
};

export default memo(PlayerRow);
