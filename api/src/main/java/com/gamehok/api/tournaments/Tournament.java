package com.gamehok.api.tournaments;

import jakarta.persistence.*;

@Entity
@Table(name = "tournaments")
public class Tournament {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String title;

  @Column(name = "game_name")
  private String gameName;

  @Column(name = "prize_pool")
  private Float prizePool;

  private String description;

  @Column(columnDefinition = "VARCHAR(255) DEFAULT 'Upcoming'")
  private String status;

  // Ensure status has a default value before persisting
  @PrePersist
  public void prePersist() {
    if (status == null) {
      status = "Upcoming";
    }
  }

  // Getters and Setters
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getGameName() {
    return gameName;
  }

  public void setGameName(String gameName) {
    this.gameName = gameName;
  }

  public Float getPrizePool() {
    return prizePool;
  }

  public void setPrizePool(Float prizePool) {
    this.prizePool = prizePool;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }
}
