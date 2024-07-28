import React, { useEffect, useState, useRef, useCallback } from "react";
import PlayerRow from "../Player/PlayerRow";
import "./Leaderboard.css";

interface PlayerType {
  userID: string;
  displayName: string;
  picture: string;
  score: number;
}

const initialPlayers: PlayerType[] = [
  { userID: "u-1", displayName: "Jone", picture: "", score: 157000 },
  { userID: "u-2", displayName: "Victoria", picture: "", score: 46200 },
  { userID: "u-3", displayName: "Joy", picture: "", score: 38800 },
  { userID: "u-4", displayName: "Quinn", picture: "", score: 30800 },
  { userID: "u-5", displayName: "Sheenalo", picture: "", score: 30800 },
  { userID: "u-6", displayName: "Charlene", picture: "", score: 30800 },
  { userID: "u-7", displayName: "LeonaBaby", picture: "", score: 30800 },
  { userID: "u-8", displayName: "Sunny", picture: "", score: 17800 },
  { userID: "u-9", displayName: "ImWord", picture: "", score: 30800 },
  { userID: "u-10", displayName: "Dophine", picture: "", score: 15400 },
];

const Leaderboard: React.FC = () => {
  const [players, setPlayers] = useState<PlayerType[]>(initialPlayers);
  const prevPlayersRef = useRef<PlayerType[]>(initialPlayers);

  const updatePlayers = useCallback(() => {
    setPlayers((prevPlayers) => {
      const newPlayers = prevPlayers
        .map((player) => ({
          ...player,
          score: player.score + Math.floor(Math.random() * 100),
        }))
        .sort((a, b) => b.score - a.score);
      prevPlayersRef.current = prevPlayers;
      return newPlayers;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(updatePlayers, 1000);
    return () => clearInterval(interval);
  }, [updatePlayers]);

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Leaderboard</h2>
      <div className="leaderboard">
        <div className="leaderboard-header">
          <span className="header-rank">Rank</span>
          <span className="header-userID">User ID</span>
          <span className="header-name">Name</span>
          <span className="header-score">Score</span>
        </div>
        {players.map((player, index) => {
          const prevIndex = prevPlayersRef.current.findIndex(
            (p) => p.userID === player.userID
          );
          return (
            <PlayerRow
              key={player.userID}
              player={player}
              index={index}
              prevIndex={prevIndex}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
