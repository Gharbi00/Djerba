package com.example.BackEnd.controller;

import com.example.BackEnd.entity.Hotel;
import com.example.BackEnd.service.HotelService;
import com.example.BackEnd.dto.HotelDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @PostMapping
    public ResponseEntity<HotelDTO> saveHotel(@RequestBody HotelDTO hotelDTO) {
        if (hotelDTO.getPhotos() == null) {
            hotelDTO.setPhotos(new ArrayList<>());
        }
        try {
            HotelDTO savedHotel = hotelService.saveHotel(hotelDTO);
            return ResponseEntity.ok(savedHotel);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<HotelDTO>> getAllHotels() {
        try {
            List<HotelDTO> hotels = hotelService.getAllHotels();
            return ResponseEntity.ok(hotels);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<HotelDTO> getHotelById(@PathVariable Long id) {
        try {
            Optional<HotelDTO> hotel = hotelService.getHotelById(id);
            return hotel.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
        try {
            Optional<HotelDTO> hotel = hotelService.getHotelById(id);
            if (hotel.isPresent()) {
                hotelService.deleteHotel(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<HotelDTO> updateHotel(@PathVariable Long id, @RequestBody HotelDTO hotelDTO) {
        try {
            hotelDTO.setId(id);
            if (hotelDTO.getName() == null || hotelDTO.getName().isEmpty()) {
                return ResponseEntity.status(400).body(null);
            }
            HotelDTO updatedHotel = hotelService.saveHotel(hotelDTO);
            return ResponseEntity.ok(updatedHotel);
        } catch (Exception e) {
            e.printStackTrace();  // This will log the detailed error stack trace
            return ResponseEntity.status(500).build();
        }
    }
    
    @PostMapping("/{id}/offers")
    public ResponseEntity<?> addOffersPrices(@PathVariable Long id, @RequestBody List<Float> offers) {
        try {
            HotelDTO updatedHotel = hotelService.addOffersPrices(id, offers);
            return ResponseEntity.ok(updatedHotel);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/{id}/offers")
    public ResponseEntity<?> updateOffersPrices(@PathVariable Long id, @RequestBody List<Float> offers) {
        try {
            HotelDTO updatedHotel = hotelService.updateOffersPrices(id, offers);
            return ResponseEntity.ok(updatedHotel);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{id}/offers")
    public ResponseEntity<?> getOffersPrices(@PathVariable Long id) {
        try {
            List<Float> offersPrices = hotelService.getOffersPrices(id);
            return ResponseEntity.ok(offersPrices);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @DeleteMapping("/{id}/offers")
    public ResponseEntity<?> deleteOffersPrices(@PathVariable Long id) {
        try {
            hotelService.deleteOffersPrices(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}