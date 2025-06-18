package com.example.BackEnd.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull
    private LocalDate checkInDate;

    @NotNull
    private LocalDate checkOutDate;

    // Total price for the stay
    private float bookingPrice;

    // Number of adults, teens, children, and babies
    private int numberOfAdults;
    private int numberOfTeens;
    private int numberOfChildren;
    private int numberOfBabies;


    @Enumerated(EnumType.STRING) // Store the enum as a string in the database
    private BookingStatus status; // The new status field
}
