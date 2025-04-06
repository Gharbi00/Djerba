package com.example.BackEnd.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "restaurant_seq", sequenceName = "restaurant_sequence", allocationSize = 1)
@DiscriminatorValue("2")
public class Restaurant extends Product{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "restaurant_seq")
    private Long id;
    
    private String cuisine;
    
    @ElementCollection
    @CollectionTable(name = "restaurant_menu", joinColumns = @JoinColumn(name = "restaurant_id"))
    private List<MenuItem> menuList;

    private BigDecimal averageDishPrice;

    public void updateAverageDishPrice() {
        if (menuList == null || menuList.isEmpty()) {
            this.averageDishPrice = BigDecimal.ZERO;
        } else {
            BigDecimal sum = menuList.stream()
                    .map(MenuItem::getPrice) // Extract prices
                    .reduce(BigDecimal.ZERO, BigDecimal::add); // Sum prices
            this.averageDishPrice = sum.divide(BigDecimal.valueOf(menuList.size()), 2, BigDecimal.ROUND_HALF_UP);
        }
    }

    
}
