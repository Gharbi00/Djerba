package com.example.BackEnd.dto;

import com.example.BackEnd.entity.Rating;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class RatingDTO {
    private Long productId;
    private Long userId;
    private int score; // Rating value (e.g., 1 to 5)

    // Default constructor
    public RatingDTO() {
    }

    // Constructor to convert Rating to RatingDTO (optional)
    public RatingDTO(Rating rating) {
        this.productId = rating.getProduct().getId();
        this.userId = rating.getUser().getId();
        this.score = rating.getScore();
    }
}
