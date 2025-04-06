package com.example.BackEnd.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RatingRequest {
    private Long userId;
    private Long productId;  // Changed hotelId to productId to make it more generic
    private int score;
    private String productType; // Add this field to specify the product type
}

