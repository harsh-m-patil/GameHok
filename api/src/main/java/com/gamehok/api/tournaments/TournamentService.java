package com.gamehok.api.tournaments;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class TournamentService {
  private final TournamentRepository tournamentRepository;

  @Autowired
  public TournamentService(TournamentRepository tournamentRepository) {
    this.tournamentRepository = tournamentRepository;
  }

  public ResponseEntity<Object> newTournament(Tournament tournament) {
    tournamentRepository.save(tournament);
    return new ResponseEntity<>(tournament, HttpStatus.CREATED);
  }

  public ResponseEntity<Object> getTournaments() {
    return ResponseEntity.ok(this.tournamentRepository.findAll());
  }

  public ResponseEntity<Object> updateTournament(Integer id, Tournament updatedTournament) {
    Optional<Tournament> tournamentOptional = tournamentRepository.findById(id);

    if (!tournamentOptional.isPresent()) {
      return ResponseEntity.notFound().build();
    }

    Tournament existingTournament = tournamentOptional.get();

    existingTournament.setTitle(updatedTournament.getTitle());
    existingTournament.setDescription(updatedTournament.getDescription());
    existingTournament.setGameName(updatedTournament.getGameName());
    existingTournament.setPrizePool(updatedTournament.getPrizePool());
    existingTournament.setStatus(updatedTournament.getStatus());

    tournamentRepository.save(existingTournament);

    return ResponseEntity.ok(existingTournament);
  }

  public ResponseEntity<Object> deleteTournament(Integer id) {
    Optional<Tournament> tournamentOptional = tournamentRepository.findById(id);

    if (!tournamentOptional.isPresent()) {
      return ResponseEntity.notFound().build();
    }

    tournamentRepository.deleteById(id);

    return ResponseEntity.ok().build();
  }

  public ResponseEntity<Object> getTournamentById(Integer id) {
    Optional<Tournament> tournamentOptional = tournamentRepository.findById(id);

    if (!tournamentOptional.isPresent()) {
      return ResponseEntity.notFound().build();
    }

    Tournament tournament = tournamentOptional.get();

    return ResponseEntity.ok(tournament);
  }
}
