package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.Profile;
import com.example.demo.repository.ProfileRepository;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository repository;

    @Transactional
    public Profile updateProfile(Long id, Profile updatedProfile) {
        return repository.findById(id)
            .map(profile -> {
                // 1. Update Basic Fields
                profile.setName(updatedProfile.getName());
                profile.setEmail(updatedProfile.getEmail());
                profile.setLocation(updatedProfile.getLocation());
                profile.setBio(updatedProfile.getBio());
                profile.setCareerVision(updatedProfile.getCareerVision());

                // 2. Sync Skills (Clear and Add All)
                profile.getSkills().clear();
                if (updatedProfile.getSkills() != null) {
                    profile.getSkills().addAll(updatedProfile.getSkills());
                }

                // 3. Sync Interests (Clear and Add All) - FIX FOR YOUR ISSUE
                profile.getInterests().clear();
                if (updatedProfile.getInterests() != null) {
                    profile.getInterests().addAll(updatedProfile.getInterests());
                }

                // 4. Sync Education
                profile.getEducation().clear();
                if (updatedProfile.getEducation() != null) {
                    profile.getEducation().addAll(updatedProfile.getEducation());
                }

                return repository.save(profile);
            })
            .orElseThrow(() -> new RuntimeException("Profile not found with id: " + id));
    }
}