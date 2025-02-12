package com.example.BackEnd.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.BackEnd.entity.Product;
import com.example.BackEnd.entity.Rating;
import com.example.BackEnd.entity.User;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    Rating findByUserAndProduct(User user, Product product);
}

