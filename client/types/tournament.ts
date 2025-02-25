export interface Tournament {
  id: string
  title: string
  game: string
  date: string
  prizePool: number
  status: "Upcoming" | "Completed"
  description?: string
  rules?: string[]
  prizeBreakdown?: {
    position: string
    amount: number
  }[]
}

