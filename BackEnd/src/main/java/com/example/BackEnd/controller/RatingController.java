package com.example.BackEnd.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.BackEnd.dto.RatingDTO;
import com.example.BackEnd.entity.Rating;
import com.example.BackEnd.service.RatingService;

@RestController
@RequestMapping("/ratings")
public class RatingController {

    private final RatingService ratingService;

    @Autowired
    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping("/create-or-update")
    public ResponseEntity<Rating> createOrUpdateRating(@RequestBody RatingDTO ratingDTO) {
        // Create or update the rating and return it as a response
        Rating rating = ratingService.createOrUpdateRating(ratingDTO);
        return ResponseEntity.ok(rating); // Return the created or updated Rating entity
    }
}
