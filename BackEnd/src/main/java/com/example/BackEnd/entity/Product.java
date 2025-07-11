package com.example.BackEnd.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_seq")
    @SequenceGenerator(name = "product_seq", sequenceName = "product_sequence", allocationSize = 1)
    private Long id;

    @NotBlank
    private String name;

    @Column(length = 1000)
    private String location;

    @Column(length = 2000)
    private String description;

    // Replaced ElementCollection with a one-to-many relation
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Photo> photos = new ArrayList<>();

    private String type;

    private long phoneNumber;

    @Column(name = "average_rating")
    protected double averageRating;

    @Column(name = "rating_count")
    protected int ratingCount;

}
