package com.example.BackEnd.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;

import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.Min;


import javax.validation.constraints.Max;


@Entity
@Getter
@Setter
@SequenceGenerator(name = "hotel_seq", sequenceName = "hotel_sequence", allocationSize = 1)
@DiscriminatorValue("hotel") 
public class Hotel extends Product {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "site_seq")
    private Long id;

    private String amenities;
    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings;

    @Min(1) 
    @Max(5)  
    private int starsNumber;
    private int availablePlaces;
    @ElementCollection
    @CollectionTable(name = "hotel_offers", joinColumns = @JoinColumn(name = "hotel_id"))
    @Column(name = "offer_price")
    @org.hibernate.annotations.Cascade(org.hibernate.annotations.CascadeType.ALL)
    private List<Float> offersPrices = new ArrayList<>();
    // Discounts between 0 and 1
    @DecimalMin("0.0")
    @DecimalMax("1.0")
    private float babiesDiscount;    // For age < 2

    @DecimalMin("0.0")
    @DecimalMax("1.0")
    private float childrenDiscount;  // For age 2-12

    @DecimalMin("0.0")
    @DecimalMax("1.0")
    private float teenDiscount; 

    @PrePersist
    public void setProductType() {
        this.setType("hotel");  
    }


}
