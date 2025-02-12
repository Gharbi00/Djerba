package com.example.BackEnd.service;

import com.example.BackEnd.entity.User; // Correct import for your User entity

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BackEnd.dto.RatingDTO;
import com.example.BackEnd.entity.Hotel;
import com.example.BackEnd.entity.Product;
import com.example.BackEnd.entity.Rating;
import com.example.BackEnd.repository.ProductRepository;
import com.example.BackEnd.repository.RatingRepository;
import com.example.BackEnd.repository.UserRepository;



@Service
public class RatingService {

    private final RatingRepository ratingRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Autowired
    public RatingService(RatingRepository ratingRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.ratingRepository = ratingRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public Rating createOrUpdateRating(RatingDTO ratingDTO) {
    // Retrieve product and user based on the IDs provided in the DTO
    Product product = productRepository.findById(ratingDTO.getProductId())
            .orElseThrow(() -> new IllegalArgumentException("Product not found"));

    // Ensure the product is of type Hotel (or handle any specific subclass logic)
    if (product instanceof Hotel) {
        Hotel hotel = (Hotel) product;
        // Here you can ensure that the hotel is the correct entity
        System.out.println("Found hotel with ID: " + hotel.getId()); // Debugging log for the ID
    } else {
        throw new IllegalArgumentException("Invalid product type, expected a Hotel.");
    }

    User user = userRepository.findById(ratingDTO.getUserId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

    // Check if the user has already rated the product
    Rating existingRating = ratingRepository.findByUserAndProduct(user, product);

    if (existingRating != null) {
        // If rating exists, update it
        existingRating.setScore(ratingDTO.getScore());
        return ratingRepository.save(existingRating);
    } else {
        // If no existing rating, create a new one
        Rating newRating = new Rating();
        newRating.setProduct(product);
        newRating.setUser(user);
        newRating.setScore(ratingDTO.getScore());
        return ratingRepository.save(newRating);
    }
}

    
}
