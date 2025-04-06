package com.example.BackEnd.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.BackEnd.dto.ReviewDTO;
import com.example.BackEnd.entity.Review;
import com.example.BackEnd.service.ReviewService;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/create")
    public ResponseEntity<Review> createReview(@RequestBody ReviewDTO reviewDTO) {
        // Create a new review and return it as a response
        Review review = reviewService.createReview(reviewDTO);
        return ResponseEntity.ok(review);
    }
}

