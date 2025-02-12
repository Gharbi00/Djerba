package com.example.BackEnd.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@DiscriminatorValue("5")
public class Taxi extends Product{

    private String contact;
}