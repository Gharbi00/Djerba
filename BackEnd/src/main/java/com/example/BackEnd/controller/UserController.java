package com.example.BackEnd.controller;

import com.example.BackEnd.dto.AuthResponse;
import com.example.BackEnd.entity.User;
import com.example.BackEnd.service.UserService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody User user) {
        Map<String, Object> responseMap = new HashMap<>();
        
        try {
            AuthResponse response = userService.register(user);
            
            // Include userEmail and role in the response map
            responseMap.put("authToken", response.getAuthToken());
            responseMap.put("authValue", response.isAuthValue());
            responseMap.put("userId", response.getUserId());
            responseMap.put("userEmail", response.getEmail());  // Include userEmail
            responseMap.put("role", response.getRole().toString());  // Include role
            
            return ResponseEntity.ok(responseMap);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", e.getMessage(),
                "authValue", false
            ));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody AuthResponse authRequest) {
        Map<String, Object> responseMap = new HashMap<>();
        try {
            String email = authRequest.getEmail();  // Get email from AuthResponse
            String password = authRequest.getPassword();
            
            AuthResponse response = userService.login(email, password);
        
            // Include authToken, authValue, userId, userEmail, and role in the response map
            responseMap.put("authToken", response.getAuthToken());
            responseMap.put("authValue", response.isAuthValue());
            responseMap.put("userId", response.getUserId());
            responseMap.put("userEmail", response.getEmail());  // Include userEmail
            responseMap.put("role", response.getRole().toString());  // Include role
        
            return ResponseEntity.ok(responseMap);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "errorMessage", e.getMessage(),
                "authValue", false
            ));
        }
    }
    
    
    
    
    
    

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        userService.forgotPassword(email);
        return ResponseEntity.ok("Password reset token sent to email");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        userService.resetPassword(token, newPassword);
        return ResponseEntity.ok("Password reset successful");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestParam String token) {
        userService.logout(token);
        return ResponseEntity.ok("Logout successful");
    }
}
