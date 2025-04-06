package com.example.BackEnd.entity;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Embeddable
@Getter
@Setter
public class MenuItem {
    private String name;       
    private String pictureUrl; 
    private BigDecimal price;  
    private String category;  
}
