"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import TournamentCard from "@/components/tournament-card"
import type { Tournament } from "@/types/tournament"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

export default function TournamentDashboard() {
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [filteredTournaments, setFilteredTournaments] = useState<Tournament[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("upcoming")

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/tournaments")

        if (!response.ok) {
          throw new Error("Failed to fetch tournaments")
        }

        const data = await response.json()
        setTournaments(data)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load tournaments. Please try again later.")
        setIsLoading(false)
      }
    }

    fetchTournaments()
  }, [])

  useEffect(() => {
    // Filter tournaments based on status and search query
    const filtered = tournaments.filter((tournament) => {
      const matchesStatus =
        activeTab === "upcoming" ? tournament.status === "Upcoming" : tournament.status === "Completed"

      const matchesSearch =
        tournament.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tournament.game.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesStatus && matchesSearch
    })

    setFilteredTournaments(filtered)
  }, [tournaments, activeTab, searchQuery])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 text-primary">Tournament Dashboard</h1>
        <p className="text-muted-foreground mb-8">Browse upcoming and completed gaming tournaments</p>

        <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search tournaments or games..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <Tabs defaultValue="upcoming" className="w-full md:w-auto" onValueChange={setActiveTab}>
            <TabsList className="grid w-full md:w-[300px] grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border rounded-lg p-6 bg-card">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-md">
            <p>{error}</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : filteredTournaments.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No tournaments found</h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? "Try adjusting your search query"
                : activeTab === "upcoming"
                  ? "No upcoming tournaments scheduled"
                  : "No completed tournaments yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

