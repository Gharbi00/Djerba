package com.example.BackEnd.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private int score; // Rating value (e.g., 1 to 5)

    // Ensure uniqueness of rating per user and product
    @Column(unique = true)
    private String uniqueKey;

    @PrePersist
    @PreUpdate
    private void setUniqueKey() {
        this.uniqueKey = user.getId() + "_" + product.getId();
    }

    // Getters and Setters
}
