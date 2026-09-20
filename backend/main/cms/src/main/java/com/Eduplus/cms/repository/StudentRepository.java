package com.Eduplus.cms.repository;

import com.Eduplus.cms.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    Optional<Student> findByRegistrationNumber(String registrationNumber);
    Optional<Student> findByEmail(String email);
    List<Student> findByBranch(String branch);
    List<Student> findByRiskLevel(String riskLevel);
}
