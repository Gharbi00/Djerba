package com.example.BackEnd.controller;

import com.example.BackEnd.entity.Restaurant;
import com.example.BackEnd.entity.Site;
import com.example.BackEnd.service.SiteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/sites")
public class SiteController {

    private static final Logger logger = LoggerFactory.getLogger(SiteController.class);

    @Autowired
    private SiteService siteService;

    @PostMapping
    public ResponseEntity<Site> saveSite(@RequestBody Site site) {
        logger.debug("Received request to save site: {}", site);
        try {
            Site savedSite = siteService.saveSite(site);
            logger.debug("Site saved successfully: {}", savedSite);
            return ResponseEntity.ok(savedSite);
        } catch (Exception e) {
            logger.error("Error while saving site: {}", site, e);
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Site>> getAllSites() {
        logger.debug("Fetching all sites.");
        try {
            List<Site> sites = siteService.getAllSites();
            logger.debug("Fetched {} sites.", sites.size());
            return ResponseEntity.ok(sites);
        } catch (Exception e) {
            logger.error("Error while fetching sites.", e);
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Site> getSiteById(@PathVariable Long id) {
        logger.debug("Fetching site with ID: {}", id);
        try {
            Optional<Site> site = siteService.getSiteById(id);
            return site.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Error while fetching site by ID: {}", id, e);
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Site> updateSite(@PathVariable Long id, @RequestBody Site updatedSite) {
        logger.debug("Received request to update site with ID: {}", id);
        try {
            Optional<Site> existingSite = siteService.getSiteById(id);
            if (existingSite.isPresent()) {
                updatedSite.setId(id); // Ensure the correct ID is set
                Site savedSite = siteService.saveSite(updatedSite);
                logger.debug("Site updated successfully: {}", savedSite);
                return ResponseEntity.ok(savedSite);
            } else {
                logger.warn("Site with ID {} not found for update.", id);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("Error while updating site with ID: {}", id, e);
            return ResponseEntity.status(500).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSite(@PathVariable Long id) {
        logger.debug("Received request to delete site with ID: {}", id);
        try {
            if (siteService.getSiteById(id).isPresent()) {
                siteService.deleteSite(id);
                logger.debug("Site with ID {} deleted successfully.", id);
                return ResponseEntity.noContent().build();
            } else {
                logger.warn("Site with ID {} not found for deletion.", id);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("Error while deleting site with ID: {}", id, e);
            return ResponseEntity.status(500).build();
        }
    }
}
/* http://localhost:8080/sites/
POST SITE 
{
    "id": 1,
    "name": "Eiffel Tower",
    "location": "Paris, France",
    "description": "A famous landmark in Paris",
    "pictureList": ["https://example.com/eiffel1.jpg", "https://example.com/eiffel2.jpg"],
    "phoneNumber": 1234567890
}
    GET SITE http://localhost:8080/sites/ID
    PUT SITE http://localhost:8080/sites/{id}

    {
    "id": 1,
    "name": "Eiffel Tower REMASTERED",
    "location": "Paris, France",
    "description": "A famous landmark in Paris",
    "pictureList": ["https://example.com/eiffel1.jpg", "https://example.com/eiffel2.jpg"],
    "phoneNumber": 1234567890
}


 */