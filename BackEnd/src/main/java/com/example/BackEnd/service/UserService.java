package com.example.BackEnd.service;

import com.example.BackEnd.entity.Role;
import com.example.BackEnd.entity.User;
import com.example.BackEnd.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.BackEnd.config.JwtTokenProvider;
import com.example.BackEnd.dto.AuthResponse;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.Set;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public AuthResponse register(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email is already in use.");
        }
        if (user.getRoles() == null || user.getRoles().isEmpty()) {
            user.setRoles(Set.of(Role.CUSTOMER)); // Default to CUSTOMER role if none is provided
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    
        String authToken = jwtTokenProvider.generateToken(user.getEmail(), Role.CUSTOMER);
        
        // Return AuthResponse with userEmail and userRole
        return new AuthResponse(authToken, true, user.getId(), Role.CUSTOMER, user.getEmail());
    }
    
    public AuthResponse login(String email, String password) {
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Invalid email or password"));
    
            if (!passwordEncoder.matches(password, user.getPassword())) {
                throw new RuntimeException("Invalid email or password");
            }
    
            // Get user's role (default to CUSTOMER if none exists)
            Role userRole = user.getRoles().stream().findFirst().orElse(Role.CUSTOMER);
            
            String authToken = jwtTokenProvider.generateToken(user.getEmail(), userRole);
            
            // Return AuthResponse with userEmail and userRole
            return new AuthResponse(authToken, true, user.getId(), userRole, user.getEmail());
        } catch (Exception e) {
            System.err.println("Error during login: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("An error occurred during login");
        }
    }
     
    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not found"));

        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        userRepository.save(user);

        // Send email with token (use an email service)
        System.out.println("Password reset token: " + token);
    }

    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid reset token"));

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null); // Clear the reset token
        userRepository.save(user);
    }

    public void logout(String token) {
        System.out.println("Token invalidated: " + token);
    }
}
