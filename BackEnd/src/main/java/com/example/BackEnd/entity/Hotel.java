package com.example.BackEnd.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;

import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.Min;

import org.hibernate.annotations.Cascade;

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
    @CollectionTable(name = "hotel_offers", joinColumns = @JoinColumn(name = "hotel_id", referencedColumnName = "id", nullable = false, updatable = false))
    @Column(name = "offer_price")
    @Cascade(org.hibernate.annotations.CascadeType.DELETE) // Force Hibernate cascade delete
    private List<Float> offersPrices = new ArrayList<>();

    @DecimalMin("0.0")
    @DecimalMax("1.0")
    private float babiesDiscount;

    @DecimalMin("0.0")
    @DecimalMax("1.0")
    private float childrenDiscount;

    @DecimalMin("0.0")
    @DecimalMax("1.0")
    private float teenDiscount;

    @PrePersist
    public void setProductType() {
        this.setType("hotel");
    }

}
