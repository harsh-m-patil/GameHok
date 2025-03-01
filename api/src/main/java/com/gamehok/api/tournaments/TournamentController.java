package com.gamehok.api.tournaments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/tournaments")
public class TournamentController {
  private final TournamentService tournamentService;

  @Autowired
  public TournamentController(TournamentService tournamentService) {
    this.tournamentService = tournamentService;
  }

  @PostMapping("/")
  public ResponseEntity<Object> createTournament(@RequestBody Tournament tournament) {
    return this.tournamentService.newTournament(tournament);
  }

  @GetMapping()
  public ResponseEntity<Object> getTournaments() {
    return this.tournamentService.getTournaments();
  }

  @PutMapping("/{id}")
  public ResponseEntity<Object> updateTournamentById(@PathVariable Integer id,
      @RequestBody Tournament updatedTournament) {
    return this.tournamentService.updateTournament(id, updatedTournament);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Object> getTournamentById(@PathVariable Integer id) {
    return this.tournamentService.getTournamentById(id);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> deleteTournamentById(@PathVariable Integer id) {
    return this.tournamentService.deleteTournament(id);
  }
}
