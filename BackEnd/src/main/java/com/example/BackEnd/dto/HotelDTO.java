package com.example.BackEnd.dto;
import java.util.List;

import com.example.BackEnd.entity.Rating;
import com.example.BackEnd.entity.Review;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class HotelDTO {
    private Long id;
    private String name;
    private String location;
    private String description;
    private List<String> pictureList;
    private long phoneNumber;
    private String amenities;
    private int starsNumber;
    private int availablePlaces;
    private List<Float> offersPrices;
    private float babiesDiscount;
    private float childrenDiscount;
    private float teenDiscount;
    private List<Rating> ratings;
    private List<Review> reviews;
    // Constructors
    public HotelDTO() {}

    public HotelDTO(Long id, String name, String location, String description, List<String> pictureList,
                    long phoneNumber, String amenities, int starsNumber, int availablePlaces,
                    List<Float> offersPrices, float babiesDiscount, float childrenDiscount, float teenDiscount,
                    List<Rating> ratings, List<Review> reviews) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.description = description;
        this.pictureList = pictureList;
        this.phoneNumber = phoneNumber;
        this.amenities = amenities;
        this.starsNumber = starsNumber;
        this.availablePlaces = availablePlaces;
        this.offersPrices = offersPrices;
        this.babiesDiscount = babiesDiscount;
        this.childrenDiscount = childrenDiscount;
        this.teenDiscount = teenDiscount;
        this.ratings = ratings;
        this.reviews = reviews;
    }
}
