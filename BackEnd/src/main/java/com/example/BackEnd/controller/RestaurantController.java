package com.example.BackEnd.controller;

import com.example.BackEnd.entity.Restaurant;
import com.example.BackEnd.service.RestaurantService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/restaurants")
public class RestaurantController {

    private static final Logger logger = LoggerFactory.getLogger(RestaurantController.class);

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping
    public ResponseEntity<Restaurant> saveRestaurant(@RequestBody Restaurant restaurant) {
        logger.debug("Received request to save restaurant: {}", restaurant);
        try {
            Restaurant savedRestaurant = restaurantService.saveRestaurant(restaurant);
            logger.debug("Restaurant saved successfully: {}", savedRestaurant);
            return ResponseEntity.ok(savedRestaurant);
        } catch (Exception e) {
            logger.error("Error while saving restaurant: {}", restaurant, e);
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        logger.debug("Fetching all restaurants.");
        try {
            List<Restaurant> restaurants = restaurantService.getAllRestaurants();
            logger.debug("Fetched {} restaurants.", restaurants.size());
            return ResponseEntity.ok(restaurants);
        } catch (Exception e) {
            logger.error("Error while fetching restaurants.", e);
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Long id) {
        logger.debug("Fetching restaurant with ID: {}", id);
        try {
            Optional<Restaurant> restaurant = restaurantService.getRestaurantById(id);
            return restaurant.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Error while fetching restaurant by ID: {}", id, e);
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(@PathVariable Long id, @RequestBody Restaurant updatedRestaurant) {
        logger.debug("Received request to update restaurant with ID: {}", id);
        try {
            Optional<Restaurant> existingRestaurant = restaurantService.getRestaurantById(id);
            if (existingRestaurant.isPresent()) {
                updatedRestaurant.setId(id); // Ensure the correct ID is set
                Restaurant savedRestaurant = restaurantService.saveRestaurant(updatedRestaurant);
                logger.debug("Restaurant updated successfully: {}", savedRestaurant);
                return ResponseEntity.ok(savedRestaurant);
            } else {
                logger.warn("Restaurant with ID {} not found for update.", id);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("Error while updating restaurant with ID: {}", id, e);
            return ResponseEntity.status(500).build();
        }
    }
    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable Long id) {
        logger.debug("Received request to delete restaurant with ID: {}", id);
        try {
            if (restaurantService.getRestaurantById(id).isPresent()) {
                restaurantService.deleteRestaurant(id);
                logger.debug("Restaurant with ID {} deleted successfully.", id);
                return ResponseEntity.noContent().build();
            } else {
                logger.warn("Restaurant with ID {} not found for deletion.", id);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("Error while deleting restaurant with ID: {}", id, e);
            return ResponseEntity.status(500).build();
        }
    }
}
/* 
 Post http://localhost:8080/restaurants
 {
    "name": "La Petite Maison",
    "location": "Nice, France",
    "description": "A famous French restaurant",
    "pictureList": [
        "https://example.com/restaurant1.jpg",
        "https://example.com/restaurant2.jpg"
    ],
    "phoneNumber": 9876543210,
    "cuisine": "French",
    "menuList": [
        "Foie Gras",
        "Ratatouille",
        "Crème Brûlée"
    ]
}
    PUT http://localhost:8080/restaurants/{id}

     {
    "id":"2",
    "name": "La Petite Maison REMASTERED",
    "location": "Nice, France",
    "description": "A famous French restaurant",
    "pictureList": [
        "https://example.com/restaurant1.jpg",
        "https://example.com/restaurant2.jpg"
    ],
    "phoneNumber": 9876543210,
    "cuisine": "French",
    "menuList": [
        "Foie Gras",
        "Ratatouille",
        "Crème Brûlée"
    ]
}
 */