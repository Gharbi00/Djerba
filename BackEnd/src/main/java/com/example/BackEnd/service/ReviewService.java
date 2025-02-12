package com.example.BackEnd.service;

import com.example.BackEnd.entity.User; // Correct import for your User entity

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BackEnd.dto.ReviewDTO;
import com.example.BackEnd.entity.Product;
import com.example.BackEnd.entity.Review;
import com.example.BackEnd.repository.ProductRepository;
import com.example.BackEnd.repository.ReviewRepository;
import com.example.BackEnd.repository.UserRepository;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public Review createReview(ReviewDTO reviewDTO) {
        // Retrieve product and user
        Product product = productRepository.findById(reviewDTO.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));
        User user = userRepository.findById(reviewDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Create a new review
        Review review = new Review();
        review.setProduct(product);
        review.setUser(user);
        review.setComment(reviewDTO.getComment());
        review.setTitle(reviewDTO.getTitle());
        review.setCreatedAt(LocalDateTime.now().toString()); // Timestamp for when the review was created

        return reviewRepository.save(review);
    }
}
