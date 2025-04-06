package com.example.BackEnd.repository;

import com.example.BackEnd.entity.Restaurant;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
}
