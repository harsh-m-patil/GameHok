"use client"

import { Calendar, Trophy, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Tournament } from "@/types/tournament"
import Link from "next/link"
import { motion } from "framer-motion"

interface TournamentCardProps {
  tournament: Tournament
}

export default function TournamentCard({ tournament }: TournamentCardProps) {
  const { id, title, gameName, date, prizePool, status } = tournament

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  const formattedPrize = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(prizePool)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-2 hover:border-primary/50">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-xl line-clamp-2">{title}</h3>
              <p className="text-muted-foreground text-sm mt-1">{gameName}</p>
            </div>
            <Badge
              variant={status === "Upcoming" ? "default" : "secondary"}
              className={`${status === "Upcoming" ? "bg-green-600 hover:bg-green-700" : ""}`}
            >
              {status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Trophy className="h-4 w-4 text-amber-500" />
              <span className="font-medium">{formattedPrize} Prize Pool</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full group">
            <Link href={`/tournaments/${id}`}>
              View Details
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

