import { NextResponse } from "next/server"
import type { Tournament } from "@/types/tournament"

// Mock data for tournaments
const tournaments: Tournament[] = [
  {
    id: "1",
    title: "Apex Legends Global Series",
    game: "Apex Legends",
    date: "2025-03-15T10:00:00Z",
    prizePool: 250000,
    status: "Upcoming",
    description:
      "The Apex Legends Global Series brings together the world's best players to compete for glory and a massive prize pool. This tournament features 20 teams of 3 players each, battling across multiple rounds of intense competition.",
    rules: [
      "Teams must consist of 3 players",
      "Double elimination bracket",
      "All matches are best of 3",
      "Finals are best of 5",
      "Standard ALGS ruleset applies",
    ],
    prizeBreakdown: [
      { position: "1st Place", amount: 100000 },
      { position: "2nd Place", amount: 50000 },
      { position: "3rd Place", amount: 30000 },
      { position: "4th Place", amount: 20000 },
      { position: "5th-8th Place", amount: 12500 },
    ],
  },
  {
    id: "2",
    title: "Call of Duty League Championship",
    game: "Call of Duty: Modern Warfare",
    date: "2025-04-22T14:00:00Z",
    prizePool: 500000,
    status: "Upcoming",
    description:
      "The pinnacle of Call of Duty esports, featuring the top professional teams from around the world competing for the championship title and the largest prize pool in Call of Duty history.",
    rules: [
      "Teams must consist of 4 players",
      "Double elimination bracket",
      "All matches are best of 5",
      "Standard CDL ruleset applies",
      "Maps and modes follow official rotation",
    ],
    prizeBreakdown: [
      { position: "1st Place", amount: 200000 },
      { position: "2nd Place", amount: 120000 },
      { position: "3rd Place", amount: 80000 },
      { position: "4th Place", amount: 40000 },
      { position: "5th-8th Place", amount: 15000 },
    ],
  },
  {
    id: "3",
    title: "Fortnite World Cup",
    game: "Fortnite",
    date: "2025-05-10T16:00:00Z",
    prizePool: 1000000,
    status: "Upcoming",
    description:
      "The biggest Fortnite tournament of the year, bringing together the best solo and duo players to compete for an enormous prize pool and the title of World Champion.",
    rules: [
      "Solo and Duo competitions",
      "Point-based scoring system",
      "6 matches per round",
      "Top 100 players advance to finals",
      "Victory Royale awards 10 points",
    ],
    prizeBreakdown: [
      { position: "1st Place", amount: 300000 },
      { position: "2nd Place", amount: 200000 },
      { position: "3rd Place", amount: 150000 },
      { position: "4th Place", amount: 100000 },
      { position: "5th-10th Place", amount: 50000 },
    ],
  },
  {
    id: "4",
    title: "League of Legends World Championship",
    game: "League of Legends",
    date: "2024-10-05T18:00:00Z",
    prizePool: 2500000,
    status: "Completed",
    description:
      "The premier global League of Legends esports tournament, featuring the top teams from all regional leagues competing for the Summoner's Cup and world champion status.",
    rules: [
      "Teams must consist of 5 players and up to 1 substitute",
      "Group stage followed by knockout stage",
      "All knockout matches are best of 5",
      "Standard tournament draft mode",
      "Regional qualification required",
    ],
    prizeBreakdown: [
      { position: "1st Place", amount: 1000000 },
      { position: "2nd Place", amount: 500000 },
      { position: "3rd-4th Place", amount: 250000 },
      { position: "5th-8th Place", amount: 125000 },
      { position: "9th-16th Place", amount: 50000 },
    ],
  },
  {
    id: "5",
    title: "Dota 2 The International",
    game: "Dota 2",
    date: "2024-08-15T12:00:00Z",
    prizePool: 30000000,
    status: "Completed",
    description:
      "The most prestigious Dota 2 tournament with the largest prize pool in esports history. Teams from around the world compete in this annual championship organized by Valve Corporation.",
    rules: [
      "Teams must consist of 5 players",
      "Group stage followed by double elimination bracket",
      "Lower bracket matches are best of 1 in early rounds",
      "Finals are best of 5",
      "Standard tournament rules apply",
    ],
    prizeBreakdown: [
      { position: "1st Place", amount: 15000000 },
      { position: "2nd Place", amount: 5000000 },
      { position: "3rd Place", amount: 3000000 },
      { position: "4th Place", amount: 2000000 },
      { position: "5th-6th Place", amount: 1000000 },
      { position: "7th-8th Place", amount: 800000 },
    ],
  },
  {
    id: "6",
    title: "Rocket League Championship Series",
    game: "Rocket League",
    date: "2024-11-30T15:00:00Z",
    prizePool: 300000,
    status: "Completed",
    description:
      "The official championship series for Rocket League, featuring the best teams from North America, Europe, Oceania, and South America competing for the world championship title.",
    rules: [
      "Teams must consist of 3 players",
      "Regional qualifiers followed by world championship",
      "Double elimination bracket",
      "All matches are best of 5, finals are best of 7",
      "Standard RLCS rules apply",
    ],
    prizeBreakdown: [
      { position: "1st Place", amount: 120000 },
      { position: "2nd Place", amount: 60000 },
      { position: "3rd-4th Place", amount: 30000 },
      { position: "5th-8th Place", amount: 15000 },
    ],
  },
  {
    id: "7",
    title: "Valorant Champions Tour",
    game: "Valorant",
    date: "2025-06-20T17:00:00Z",
    prizePool: 700000,
    status: "Upcoming",
    description:
      "The premier Valorant esports circuit, bringing together the best teams from around the world to compete in regional and international tournaments throughout the year.",
    rules: [
      "Teams must consist of 5 players",
      "Regional qualifiers followed by international Masters events",
      "Double elimination bracket",
      "All matches are best of 3, finals are best of 5",
      "Standard VCT rules apply",
    ],
    prizeBreakdown: [
      { position: "1st Place", amount: 300000 },
      { position: "2nd Place", amount: 150000 },
      { position: "3rd Place", amount: 90000 },
      { position: "4th Place", amount: 60000 },
      { position: "5th-8th Place", amount: 25000 },
    ],
  },
  {
    id: "8",
    title: "Rainbow Six Siege Invitational",
    game: "Rainbow Six Siege",
    date: "2024-09-10T13:00:00Z",
    prizePool: 400000,
    status: "Completed",
    description:
      "The most prestigious tournament in Rainbow Six Siege esports, featuring the top teams from all regions competing for the title of world champion.",
    rules: [
      "Teams must consist of 5 players",
      "Group stage followed by single elimination bracket",
      "All playoff matches are best of 3",
      "Finals are best of 5",
      "Standard competitive map pool",
    ],
    prizeBreakdown: [
      { position: "1st Place", amount: 200000 },
      { position: "2nd Place", amount: 80000 },
      { position: "3rd-4th Place", amount: 40000 },
      { position: "5th-8th Place", amount: 10000 },
    ],
  },
]

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return NextResponse.json(tournaments)
}

