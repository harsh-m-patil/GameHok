export interface Tournament {
  id: string
  title: string
  gameName: string
  date: string
  prizePool: number
  status?: "Upcoming" | "Completed"
  description?: string
}

