package com.example.BackEnd.service;

import com.example.BackEnd.entity.Activity;
import com.example.BackEnd.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    // Create or Update Activity
    public Activity saveActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    // Get All Activities
    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    // Get Activity by ID
    public Optional<Activity> getActivityById(Long id) {
        return activityRepository.findById(id);
    }

    // Delete Activity by ID
    public void deleteActivity(Long id) {
        activityRepository.deleteById(id);
    }
}
