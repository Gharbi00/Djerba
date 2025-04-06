package com.example.BackEnd.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BackEnd.entity.Taxi;
import com.example.BackEnd.repository.TaxiRepository;

@Service
public class TaxiService {

    @Autowired
    private TaxiRepository taxirepository;

    public Taxi saveTaxi(Taxi Taxi) {
        return taxirepository.save(Taxi);
    }

    public List<Taxi> getAllTaxis() {
        return taxirepository.findAll();
    }

    public Optional<Taxi> getTaxiById(Long id) {
        return taxirepository.findById(id);
    }

    public void deleteTaxi(Long id) {
        taxirepository.deleteById(id);
    }
}

