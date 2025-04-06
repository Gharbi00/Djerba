package com.example.BackEnd.dto;

import com.example.BackEnd.entity.Rating;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RatingDTO {

    private Long userId;
    private Long productId;
    private String productType;
    private int score;
}

