package com.example.BackEnd.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.BackEnd.entity.Rating;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    Optional<Rating> findByUserIdAndProductIdAndProductType(Long userId, Long productId, String productType);

    List<Rating> findByProductIdAndProductType(Long productId, String productType);

    Optional<Rating> findByUserIdAndProductId(Long userId, Long productId);

    @Query("SELECT AVG(r.score) FROM Rating r WHERE r.product.id = :productId AND r.product.type = :productType")
    double findAverageRatingByProduct(@Param("productId") Long productId, @Param("productType") String productType);

    // Query to update the average rating in the Product table
    @Modifying
    @Query("UPDATE Product p SET p.averageRating = :averageRating WHERE p.id = :productId")
    void updateAverageRating(@Param("productId") Long productId, @Param("averageRating") double averageRating);

}



