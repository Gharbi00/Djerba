package com.example.BackEnd.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@DiscriminatorValue("5")
@SequenceGenerator(name = "taxi_seq", sequenceName = "taxi_sequence", allocationSize = 1)
public class Taxi extends Product{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "taxi_seq")
    private Long id;

}