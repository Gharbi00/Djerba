package com.example.BackEnd.controller;

import com.example.BackEnd.dto.BookingRequest;
import com.example.BackEnd.entity.Booking;
import com.example.BackEnd.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDate;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }
    @PostMapping("/reserve")
    public ResponseEntity<Booking> createBooking(@RequestBody BookingRequest bookingDTO) {
        // Create the booking and return it as a response
        Booking booking = bookingService.createBooking(bookingDTO);
        return ResponseEntity.ok(booking);
    }
    
    }

