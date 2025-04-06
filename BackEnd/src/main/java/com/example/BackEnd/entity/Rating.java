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
    @JoinColumn(name = "product_id")
    private Product product; 

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private int score;

    private String productType;  
    
}
