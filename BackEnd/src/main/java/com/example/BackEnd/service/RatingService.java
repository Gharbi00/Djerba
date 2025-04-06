package com.example.BackEnd.service;

import com.example.BackEnd.entity.User; // Correct import for your User entity

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.BackEnd.entity.Activity;
import com.example.BackEnd.entity.Hotel;
import com.example.BackEnd.entity.Product;
import com.example.BackEnd.entity.Rating;
import com.example.BackEnd.entity.Restaurant;
import com.example.BackEnd.entity.Site;
import com.example.BackEnd.entity.Taxi;
import com.example.BackEnd.entity.TouristGuide;
import com.example.BackEnd.repository.ActivityRepository;
import com.example.BackEnd.repository.HotelRepository;
import com.example.BackEnd.repository.RatingRepository;
import com.example.BackEnd.repository.RestaurantRepository;
import com.example.BackEnd.repository.SiteRepository;
import com.example.BackEnd.repository.TaxiRepository;
import com.example.BackEnd.repository.TouristGuideRepository;
import com.example.BackEnd.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class RatingService {

    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;
    private final HotelRepository hotelRepository;
    private final RestaurantRepository restaurantRepository;
    private final SiteRepository siteRepository;
    private final ActivityRepository activityRepository;
    private final TaxiRepository taxiRepository;
    private final TouristGuideRepository touristGuideRepository;

public Rating submitRating(Long userId, Long productId, String productType, int score) {
    User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

    Product product = findProductByIdAndType(productId, productType);

    Rating rating = new Rating();
    rating.setUser(user);
    rating.setProduct(product);
    rating.setProductType(productType);
    rating.setScore(score);

    return ratingRepository.save(rating);
}

private Product findProductByIdAndType(Long productId, String productType) {
    switch (productType.toLowerCase()) {
        case "hotel": return hotelRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        case "restaurant": return restaurantRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
        case "site": return siteRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Site not found"));
        case "activity": return activityRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Activity not found"));
        case "taxi": return taxiRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Taxi not found"));
        case "tourist_guide": return touristGuideRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Tourist Guide not found"));
        default: throw new RuntimeException("Invalid product type: " + productType);
    }
}
    public List<Rating> getRatingsByProduct(Long productId, String productType) {
        return ratingRepository.findByProductIdAndProductType(productId, productType);
    }

    public Optional<Rating> getUserRatingForProduct(Long userId, Long productId, String productType) {
        return ratingRepository.findByUserIdAndProductIdAndProductType(userId, productId, productType);
    }
    public double getAverageRating(Long productId, String productType) {
        return ratingRepository.findAverageRatingByProduct(productId, productType);
    }
    @Transactional
    public void updateAverageRating(Product product) {
        // Calculate the average rating using the repository
        double averageRating = ratingRepository.findAverageRatingByProduct(product.getId(), product.getType());

        // Update the averageRating column in the Product table
        ratingRepository.updateAverageRating(product.getId(), averageRating);

        // Optionally, you can also set the averageRating in the product entity
        product.setAverageRating(averageRating);
    }
}
