package com.example.BackEnd.service;

import com.example.BackEnd.dto.HotelDTO;
import com.example.BackEnd.entity.Hotel;
import com.example.BackEnd.entity.Review;
import com.example.BackEnd.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;



@Service
public class HotelService {
    private final RatingService ratingService;
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    public HotelService(RatingService ratingService, HotelRepository hotelRepository) {
        this.ratingService = ratingService;
        this.hotelRepository = hotelRepository;
    }
    // Convert Entity -> DTO
    private HotelDTO convertToDTO(Hotel hotel) {
        return new HotelDTO(
            hotel.getId(),
            hotel.getName(),
            hotel.getLocation(),
            hotel.getDescription(),
            hotel.getPictureList(),
            hotel.getPhoneNumber(),
            hotel.getAmenities(),
            hotel.getStarsNumber(),
            hotel.getAvailablePlaces(),
            hotel.getOffersPrices(),
            hotel.getBabiesDiscount(),
            hotel.getChildrenDiscount(),
            hotel.getTeenDiscount()
            //hotel.getRatings(),
            //hotel.getReviews()
        );
    }

    // Convert DTO -> Entity
    private Hotel convertToEntity(HotelDTO hotelDTO) {
        Hotel hotel = new Hotel();
        hotel.setId(hotelDTO.getId());
        hotel.setName(hotelDTO.getName());
        hotel.setLocation(hotelDTO.getLocation());
        hotel.setDescription(hotelDTO.getDescription());
        hotel.setPictureList(hotelDTO.getPictureList());
        hotel.setPhoneNumber(hotelDTO.getPhoneNumber());
        hotel.setAmenities(hotelDTO.getAmenities());
        hotel.setStarsNumber(hotelDTO.getStarsNumber());
        hotel.setAvailablePlaces(hotelDTO.getAvailablePlaces());
        hotel.setOffersPrices(hotelDTO.getOffersPrices());
        hotel.setBabiesDiscount(hotelDTO.getBabiesDiscount());
        hotel.setChildrenDiscount(hotelDTO.getChildrenDiscount());
        hotel.setTeenDiscount(hotelDTO.getTeenDiscount());
        return hotel;
    }

public HotelDTO saveHotel(HotelDTO hotelDTO) {
    Hotel hotel;

    if (hotelDTO.getId() != null) {
        // Update scenario: Fetch existing hotel from the database
        hotel = hotelRepository.findById(hotelDTO.getId())
                .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + hotelDTO.getId()));
        
        // Update basic fields
        hotel.setName(hotelDTO.getName());
        hotel.setDescription(hotelDTO.getDescription());
        hotel.setLocation(hotelDTO.getLocation());
        hotel.setPhoneNumber(hotelDTO.getPhoneNumber());

        // Update pictureList
        hotel.getPictureList().clear();
        hotel.getPictureList().addAll(hotelDTO.getPictureList() != null ? hotelDTO.getPictureList() : new ArrayList<>());

        // Update ratings with proper references
/*         hotel.getRatings().clear();
        if (hotelDTO.getRatings() != null) {
            for (Rating rating : hotelDTO.getRatings()) {
                //rating.setProduct(hotel);  // Maintain bidirectional link
                hotel.getRatings().add(rating);
            }
        } */

        // Update reviews with proper references
        //hotel.getReviews().clear();
        if (hotelDTO.getReviews() != null) {
            for (Review review : hotelDTO.getReviews()) {
                review.setProduct(hotel);  // Maintain bidirectional link
                //hotel.getReviews().add(review);
            }
        }

        // Update hotel-specific fields
        hotel.setAmenities(hotelDTO.getAmenities());
        hotel.setStarsNumber(hotelDTO.getStarsNumber());
        hotel.setAvailablePlaces(hotelDTO.getAvailablePlaces());
        hotel.setOffersPrices(hotelDTO.getOffersPrices() != null ? hotelDTO.getOffersPrices() : new ArrayList<>());
        hotel.setBabiesDiscount(hotelDTO.getBabiesDiscount());
        hotel.setChildrenDiscount(hotelDTO.getChildrenDiscount());
        hotel.setTeenDiscount(hotelDTO.getTeenDiscount());

    } else {
        // Create scenario: Convert DTO to a new entity
        hotel = convertToEntity(hotelDTO);
    }

    // Save the hotel and return the DTO
    return convertToDTO(hotelRepository.save(hotel));
}


    public List<HotelDTO> getAllHotels() {
        return hotelRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public Optional<HotelDTO> getHotelById(Long id) {
        return hotelRepository.findById(id).map(this::convertToDTO);
    }

    public void deleteHotel(Long id) {
        hotelRepository.deleteById(id);
    }

    public HotelDTO addOffersPrices(Long id, List<Float> offers) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        hotel.getOffersPrices().addAll(offers);
        return convertToDTO(hotelRepository.save(hotel));
    }

    public HotelDTO updateOffersPrices(Long id, List<Float> offers) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        hotel.setOffersPrices(offers);
        return convertToDTO(hotelRepository.save(hotel));
    }

    public List<Float> getOffersPrices(Long id) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        return hotel.getOffersPrices();
    }

    public void deleteOffersPrices(Long id) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        hotel.getOffersPrices().clear();
        hotelRepository.save(hotel);
    }

    public void updateHotelAverageRating(Long hotelId) {
        Optional<Hotel> hotelOptional = hotelRepository.findById(hotelId);
        if (hotelOptional.isPresent()) {
            Hotel hotel = hotelOptional.get();
            ratingService.updateAverageRating(hotel);  // Update the average rating using the service
            hotelRepository.save(hotel);  // Save the updated hotel entity
        }
    }
}
