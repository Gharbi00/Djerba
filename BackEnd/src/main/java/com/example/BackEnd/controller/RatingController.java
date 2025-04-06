package com.example.BackEnd.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.BackEnd.dto.RatingRequest;
import com.example.BackEnd.entity.Rating;
import com.example.BackEnd.service.RatingService;

import lombok.RequiredArgsConstructor;
@RestController
@RequestMapping("/ratings")
@RequiredArgsConstructor
public class RatingController {

    private final RatingService ratingService;

    @PostMapping("/submit")
    public ResponseEntity<Rating> submitRating(@RequestBody RatingRequest ratingRequest) {
        Rating rating = ratingService.submitRating(
                ratingRequest.getUserId(),
                ratingRequest.getProductId(),
                ratingRequest.getProductType(),  // Pass product type
                ratingRequest.getScore()
        );
        return ResponseEntity.ok(rating);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Rating>> getRatingsByProduct(
            @PathVariable Long productId,
            @RequestParam String productType) { // Allow specifying product type dynamically
        return ResponseEntity.ok(ratingService.getRatingsByProduct(productId, productType));
    }

    @GetMapping("/user/{userId}/product/{productId}")
    public ResponseEntity<Optional<Rating>> getUserRatingForProduct(
            @PathVariable Long userId,
            @PathVariable Long productId,
            @RequestParam String productType) { // Pass product type as parameter
        return ResponseEntity.ok(ratingService.getUserRatingForProduct(userId, productId, productType));
    }

    @GetMapping("/{productId}/average-rating")
    public ResponseEntity<Double> getAverageRating(@PathVariable Long productId, @RequestParam String productType) {
        double averageRating = ratingService.getAverageRating(productId, productType);
        return ResponseEntity.ok(averageRating);
    }
}

/* http://localhost:8080/ratings/submit {
    "userId": 9,
    "productId": 552,
    "score": 3,
    "productType": "hotel"
} */
