package com.example.BackEnd.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "tourist_guide_seq", sequenceName = "tourist_guide_sequence", allocationSize = 1)
@DiscriminatorValue("6")
public class TouristGuide extends Product{

        @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tourist_guide_seq")
    private Long id;
    private String language;
    private String experience;

}