package com.example.BackEnd.controller;
import com.example.BackEnd.entity.TouristGuide;
import com.example.BackEnd.service.TouristGuideService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tourist-guides")
public class TouristGuideController {

    private static final Logger logger = LoggerFactory.getLogger(TouristGuideController.class);

    @Autowired
    private TouristGuideService TouristGuideService;

    @PostMapping
    public ResponseEntity<TouristGuide> saveTouristGuide(@RequestBody TouristGuide TouristGuide) {
        logger.debug("Received request to save TouristGuide: {}", TouristGuide);
        try {
            TouristGuide savedTouristGuide = TouristGuideService.saveTouristGuide(TouristGuide);
            logger.debug("TouristGuide saved successfully: {}", savedTouristGuide);
            return ResponseEntity.ok(savedTouristGuide);
        } catch (Exception e) {
            logger.error("Error while saving TouristGuide: {}", TouristGuide, e);
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<TouristGuide>> getAllTouristGuides() {
        logger.debug("Fetching all TouristGuides.");
        try {
            List<TouristGuide> TouristGuides = TouristGuideService.getAllTouristGuides();
            logger.debug("Fetched {} TouristGuides.", TouristGuides.size());
            return ResponseEntity.ok(TouristGuides);
        } catch (Exception e) {
            logger.error("Error while fetching TouristGuides.", e);
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<TouristGuide> getTouristGuideById(@PathVariable Long id) {
        logger.debug("Fetching TouristGuide with ID: {}", id);
        try {
            Optional<TouristGuide> TouristGuide = TouristGuideService.getTouristGuideById(id);
            return TouristGuide.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Error while fetching TouristGuide by ID: {}", id, e);
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<TouristGuide> updateTouristGuide(@PathVariable Long id, @RequestBody TouristGuide updatedTouristGuide) {
        logger.debug("Received request to update TouristGuide with ID: {}", id);
        try {
            Optional<TouristGuide> existingTouristGuide = TouristGuideService.getTouristGuideById(id);
            if (existingTouristGuide.isPresent()) {
                updatedTouristGuide.setId(id); // Ensure the correct ID is set
                TouristGuide savedTouristGuide = TouristGuideService.saveTouristGuide(updatedTouristGuide);
                logger.debug("TouristGuide updated successfully: {}", savedTouristGuide);
                return ResponseEntity.ok(savedTouristGuide);
            } else {
                logger.warn("TouristGuide with ID {} not found for update.", id);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("Error while updating TouristGuide with ID: {}", id, e);
            return ResponseEntity.status(500).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTouristGuide(@PathVariable Long id) {
        logger.debug("Received request to delete TouristGuide with ID: {}", id);
        try {
            if (TouristGuideService.getTouristGuideById(id).isPresent()) {
                TouristGuideService.deleteTouristGuide(id);
                logger.debug("TouristGuide with ID {} deleted successfully.", id);
                return ResponseEntity.noContent().build();
            } else {
                logger.warn("TouristGuide with ID {} not found for deletion.", id);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("Error while deleting TouristGuide with ID: {}", id, e);
            return ResponseEntity.status(500).build();
        }
    }
}
/* http://localhost:8080/tourist-guides/
POST TouristGuide 
{
    "name": "Eiffel Tower",
    "description": "A famous landmark in Paris",
    "pictureList": ["https://example.com/eiffel1.jpg", "https://example.com/eiffel2.jpg"],
    "phoneNumber": 1234567890
}
    GET TouristGuide http://localhost:8080/TouristGuides/ID
    PUT TouristGuide http://localhost:8080/TouristGuides/{id}

    {
    "id": 1,
    "name": "Eiffel Tower REMASTERED",
    "location": "Paris, France",
    "description": "A famous landmark in Paris",
    "pictureList": ["https://example.com/eiffel1.jpg", "https://example.com/eiffel2.jpg"],
    "phoneNumber": 1234567890
}


 */