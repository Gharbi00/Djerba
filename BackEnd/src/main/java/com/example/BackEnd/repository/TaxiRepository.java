package com.example.BackEnd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.BackEnd.entity.Taxi;

@Repository
public interface TaxiRepository extends JpaRepository<Taxi, Long> {
}
