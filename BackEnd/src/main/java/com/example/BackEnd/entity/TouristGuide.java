package com.example.BackEnd.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@DiscriminatorValue("6")
public class TouristGuide extends Product{

    private String language;
    private String experience;

}