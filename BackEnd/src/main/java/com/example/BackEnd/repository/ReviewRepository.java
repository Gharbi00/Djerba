package com.example.BackEnd.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.BackEnd.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}

