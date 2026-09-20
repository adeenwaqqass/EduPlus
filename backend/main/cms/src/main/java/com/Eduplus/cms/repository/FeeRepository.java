package com.Eduplus.cms.repository;

import com.Eduplus.cms.model.FeeStatement;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FeeRepository extends MongoRepository<FeeStatement, String> {
    Optional<FeeStatement> findByRegistrationNumber(String registrationNumber);
}
