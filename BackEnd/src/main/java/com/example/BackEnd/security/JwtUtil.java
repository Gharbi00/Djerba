package com.example.BackEnd.security;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import com.example.BackEnd.entity.Role;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    private final String secret = "your_secret_key";
    private final long expiration = 36000000; // 10 hour in milliseconds

public String generateToken(String email, Role role) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("role", role.name());  // Adding the user role as a claim

    return Jwts.builder()
            .setClaims(claims)
            .setSubject(email)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(SignatureAlgorithm.HS512, secret)
            .compact();
}

    public String getEmailFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
