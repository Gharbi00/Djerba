package com.example.BackEnd.service;


import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.BackEnd.dto.BookingDTO;
import com.example.BackEnd.dto.BookingRequest;
import com.example.BackEnd.entity.Booking;
import com.example.BackEnd.entity.BookingStatus;
import com.example.BackEnd.entity.Hotel;
import com.example.BackEnd.entity.User;
import com.example.BackEnd.repository.BookingRepository;
import com.example.BackEnd.repository.HotelRepository;
import com.example.BackEnd.repository.UserRepository;



@Service
public class BookingService {

    private final HotelRepository hotelRepository;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;

    @Autowired
    public BookingService(HotelRepository hotelRepository, UserRepository userRepository, BookingRepository bookingRepository) {
        this.hotelRepository = hotelRepository;
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
    }

@Transactional
public Booking createBooking(BookingRequest bookingRequest) {
    // Retrieve the hotel and user from their respective repositories
    Hotel hotel = hotelRepository.findById(bookingRequest.getHotelId())
            .orElseThrow(() -> new IllegalArgumentException("Hotel not found"));
    User user = userRepository.findById(bookingRequest.getUserId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

    // Create the booking entity
    Booking booking = new Booking();
    booking.setHotel(hotel);
    booking.setUser((com.example.BackEnd.entity.User) user);
    booking.setCheckInDate(bookingRequest.getCheckInDate());
    booking.setCheckOutDate(bookingRequest.getCheckOutDate());
    booking.setNumberOfAdults(bookingRequest.getNumberOfAdults());
    booking.setNumberOfTeens(bookingRequest.getNumberOfTeens());
    booking.setNumberOfChildren(bookingRequest.getNumberOfChildren());
    booking.setNumberOfBabies(bookingRequest.getNumberOfBabies());
    booking.setBookingPrice(bookingRequest.getBookingPrice());

    // Set the booking status to WAITING if the current date is before the check-in date
    LocalDate currentDate = LocalDate.now();
    if (currentDate.isBefore(booking.getCheckInDate())) {
        booking.setStatus(BookingStatus.WAITING);  // Set status to WAITING
    }

    // Save the booking and return it
    return bookingRepository.save(booking);
}

}
