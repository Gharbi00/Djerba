package com.example.BackEnd.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.BackEnd.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {}
