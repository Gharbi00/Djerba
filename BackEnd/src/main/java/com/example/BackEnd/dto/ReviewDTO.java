package com.example.BackEnd.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewDTO {
    private Long productId;
    private Long userId;
    private String comment;
    private String title;
}