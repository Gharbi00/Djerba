package com.example.BackEnd.controller;

import com.example.BackEnd.entity.Activity;
import com.example.BackEnd.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/activity")
public class ActivityController {

    private static final Logger logger = LoggerFactory.getLogger(ActivityController.class);

    @Autowired
    private ActivityService activityService;

    @PostMapping
    public ResponseEntity<Activity> saveActivity(@RequestBody Activity activity) {
        logger.debug("Received request to save activity: {}", activity);

        try {
            Activity savedActivity = activityService.saveActivity(activity);
            logger.debug("Activity saved successfully: {}", savedActivity);
            return ResponseEntity.ok(savedActivity);
        } catch (Exception e) {
            logger.error("Error while saving activity: {}", activity, e);
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Activity>> getAllActivities() {
        logger.debug("Fetching all activities.");

        try {
            List<Activity> activities = activityService.getAllActivities();
            logger.debug("Fetched {} activities.", activities.size());
            return ResponseEntity.ok(activities);
        } catch (Exception e) {
            logger.error("Error while fetching activities.", e);
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Activity> getActivityById(@PathVariable Long id) {
        logger.debug("Fetching activity with ID: {}", id);

        try {
            Optional<Activity> activity = activityService.getActivityById(id);
            if (activity.isPresent()) {
                logger.debug("Activity found: {}", activity.get());
                return ResponseEntity.ok(activity.get());
            } else {
                logger.warn("Activity with ID {} not found.", id);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("Error while fetching activity by ID: {}", id, e);
            return ResponseEntity.status(500).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable Long id) {
        logger.debug("Received request to delete activity with ID: {}", id);

        try {
            Optional<Activity> activity = activityService.getActivityById(id);
            if (activity.isPresent()) {
                activityService.deleteActivity(id);
                logger.debug("Activity with ID {} deleted successfully.", id);
                return ResponseEntity.noContent().build();
            } else {
                logger.warn("Activity with ID {} not found for deletion.", id);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("Error while deleting activity with ID: {}", id, e);
            return ResponseEntity.status(500).build();
        }
    }
}
