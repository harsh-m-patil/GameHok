"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Calendar, Trophy, Users, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { Tournament } from "@/types/tournament"
import Link from "next/link"

export default function TournamentDetails({ params }: { params: { id: string } }) {
  const [tournament, setTournament] = useState<Tournament | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`http://localhost:8080/api/v1/tournaments/${params.id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch tournament details")
        }

        const data = await response.json()
        setTournament(data)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load tournament details. Please try again later.")
        setIsLoading(false)
      }
    }

    fetchTournamentDetails()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-64 md:col-span-2" />
        </div>
      </div>
    )
  }

  if (error || !tournament) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-md">
          <p>{error || "Tournament not found"}</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const formattedDate = new Date(tournament.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const formattedPrize = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(tournament.prizePool)

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{tournament.title}</h1>
          <div className="flex items-center gap-2">
            <Badge
              variant={tournament.status === "Upcoming" ? "default" : "secondary"}
              className={`${tournament.status === "Upcoming" ? "bg-green-600 hover:bg-green-700" : ""}`}
            >
              {tournament.status}
            </Badge>
            <span className="text-muted-foreground">{tournament.game}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              Prize Pool
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold mb-4">{formattedPrize}</h3>
            <h4 className="font-medium mb-2">Prize Breakdown:</h4>
            <ul className="space-y-2">
              {tournament.prizeBreakdown?.map((prize, index) => (
                <li key={index} className="flex justify-between">
                  <span>{prize.position}</span>
                  <span className="font-medium">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }).format(prize.amount)}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Tournament Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-primary" />
                Description
              </h3>
              <p className="text-muted-foreground">{tournament.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-primary" />
                Rules
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {tournament.rules?.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

