package com.example.BackEnd.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "site_seq", sequenceName = "site_sequence", allocationSize = 1)
@DiscriminatorValue("3")
public class Site extends Product{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "site_seq")
    private Long id;

}
