package com.example.BackEnd.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BackEnd.entity.Site;
import com.example.BackEnd.repository.SiteRepository;

@Service
public class SiteService {

    @Autowired
    private SiteRepository siteRepository;

    public Site saveSite(Site site) {
        return siteRepository.save(site);
    }

    public List<Site> getAllSites() {
        return siteRepository.findAll();
    }

    public Optional<Site> getSiteById(Long id) {
        return siteRepository.findById(id);
    }

    public void deleteSite(Long id) {
        siteRepository.deleteById(id);
    }
}
