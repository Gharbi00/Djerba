package com.example.BackEnd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.BackEnd.entity.TouristGuide;
@Repository
public interface TouristGuideRepository extends JpaRepository<TouristGuide, Long> {
}
