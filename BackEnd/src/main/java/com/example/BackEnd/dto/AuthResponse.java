package com.example.BackEnd.dto;

import com.example.BackEnd.entity.Role;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {
    private String email;
    private String password; // Used only for login requests
    private String authToken;
    private boolean authValue;
    private Long userId;
    private Role role;

    @JsonCreator
    public AuthResponse(
        @JsonProperty("email") String email,
        @JsonProperty("password") String password,
        @JsonProperty("authToken") String authToken,
        @JsonProperty("authValue") boolean authValue,
        @JsonProperty("userId") Long userId,
        @JsonProperty("userRole") Role role
    ) {
        this.email = email;
        this.password = password;
        this.authToken = authToken;
        this.authValue = authValue;
        this.userId = userId;
        this.role = role;
    }

    public AuthResponse(String authToken, boolean authValue, Long userId, Role role, String email) {
        this.authToken = authToken;
        this.authValue = authValue;
        this.userId = userId;
        this.role = role;
        this.email = email;  
    }
}
