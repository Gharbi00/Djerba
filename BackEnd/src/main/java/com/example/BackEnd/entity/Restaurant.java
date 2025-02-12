package com.example.BackEnd.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@DiscriminatorValue("2")
public class Restaurant extends Product{
    
    private String cuisine;
    
    @ElementCollection
    private List<String> pictureList;
}
