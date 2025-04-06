package com.example.BackEnd.controller;
import com.example.BackEnd.entity.Taxi;
import com.example.BackEnd.service.TaxiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/taxis")
public class TaxiController {

    private static final Logger logger = LoggerFactory.getLogger(TaxiController.class);

    @Autowired
    private TaxiService TaxiService;

    @PostMapping
    public ResponseEntity<Taxi> saveTaxi(@RequestBody Taxi Taxi) {
        logger.debug("Received request to save Taxi: {}", Taxi);
        try {
            Taxi savedTaxi = TaxiService.saveTaxi(Taxi);
            logger.debug("Taxi saved successfully: {}", savedTaxi);
            return ResponseEntity.ok(savedTaxi);
        } catch (Exception e) {
            logger.error("Error while saving Taxi: {}", Taxi, e);
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Taxi>> getAllTaxis() {
        logger.debug("Fetching all Taxis.");
        try {
            List<Taxi> Taxis = TaxiService.getAllTaxis();
            logger.debug("Fetched {} Taxis.", Taxis.size());
            return ResponseEntity.ok(Taxis);
        } catch (Exception e) {
            logger.error("Error while fetching Taxis.", e);
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Taxi> getTaxiById(@PathVariable Long id) {
        logger.debug("Fetching Taxi with ID: {}", id);
        try {
            Optional<Taxi> Taxi = TaxiService.getTaxiById(id);
            return Taxi.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Error while fetching Taxi by ID: {}", id, e);
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Taxi> updateTaxi(@PathVariable Long id, @RequestBody Taxi updatedTaxi) {
        logger.debug("Received request to update Taxi with ID: {}", id);
        try {
            Optional<Taxi> existingTaxi = TaxiService.getTaxiById(id);
            if (existingTaxi.isPresent()) {
                updatedTaxi.setId(id); // Ensure the correct ID is set
                Taxi savedTaxi = TaxiService.saveTaxi(updatedTaxi);
                logger.debug("Taxi updated successfully: {}", savedTaxi);
                return ResponseEntity.ok(savedTaxi);
            } else {
                logger.warn("Taxi with ID {} not found for update.", id);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("Error while updating Taxi with ID: {}", id, e);
            return ResponseEntity.status(500).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaxi(@PathVariable Long id) {
        logger.debug("Received request to delete Taxi with ID: {}", id);
        try {
            if (TaxiService.getTaxiById(id).isPresent()) {
                TaxiService.deleteTaxi(id);
                logger.debug("Taxi with ID {} deleted successfully.", id);
                return ResponseEntity.noContent().build();
            } else {
                logger.warn("Taxi with ID {} not found for deletion.", id);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("Error while deleting Taxi with ID: {}", id, e);
            return ResponseEntity.status(500).build();
        }
    }
}
/* http://localhost:8080/Taxis/
POST Taxi 
{
    "name": "Eiffel Tower",
    "description": "A famous landmark in Paris",
    "pictureList": ["https://example.com/eiffel1.jpg", "https://example.com/eiffel2.jpg"],
    "phoneNumber": 1234567890
}
    GET Taxi http://localhost:8080/Taxis/ID
    PUT Taxi http://localhost:8080/Taxis/{id}

    {
    "id": 1,
    "name": "Eiffel Tower REMASTERED",
    "location": "Paris, France",
    "description": "A famous landmark in Paris",
    "pictureList": ["https://example.com/eiffel1.jpg", "https://example.com/eiffel2.jpg"],
    "phoneNumber": 1234567890
}


 */