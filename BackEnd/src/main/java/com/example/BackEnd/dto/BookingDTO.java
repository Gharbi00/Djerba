package com.example.BackEnd.dto;
import java.time.LocalDate;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class BookingDTO {
    private Long hotelId;
    private Long userId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private int numberOfAdults;
    private int numberOfTeens;
    private int numberOfChildren;
    private int numberOfBabies;
    private float bookingPrice;
}
