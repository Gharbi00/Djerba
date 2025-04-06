package com.example.BackEnd.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BackEnd.entity.TouristGuide;
import com.example.BackEnd.repository.TouristGuideRepository;

@Service
public class TouristGuideService {

    @Autowired
    private TouristGuideRepository touristGuideRepository;

    public TouristGuide saveTouristGuide(TouristGuide TouristGuide) {
        return touristGuideRepository.save(TouristGuide);
    }

    public List<TouristGuide> getAllTouristGuides() {
        return touristGuideRepository.findAll();
    }

    public Optional<TouristGuide> getTouristGuideById(Long id) {
        return touristGuideRepository.findById(id);
    }

    public void deleteTouristGuide(Long id) {
        touristGuideRepository.deleteById(id);
    }
}

