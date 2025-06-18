package com.example.BackEnd.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "activity_seq", sequenceName = "activity_sequence", allocationSize = 1)
@DiscriminatorValue("4")
public class Activity extends Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "activity_seq")
    private Long id;


}