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
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS) // Updated to TABLE_PER_CLASS
public abstract class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Use AUTO for TABLE_PER_CLASS
    private Long id;

    @NotBlank
    private String name;

    @Column(length = 1000) 
    private String location;

    @Column(length = 2000) 
    private String description;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_pictures", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "picture_url")
    private List<String> pictureList = new ArrayList<>();
    
    

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Rating> ratings = new ArrayList<>();
    

    private long phoneNumber;
}
