package com.gamehok.api.tournaments;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TournamentRepository extends JpaRepository<Tournament,Integer> {
}
