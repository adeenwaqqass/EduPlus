package com.Eduplus.cms.repository;

import com.Eduplus.cms.model.GradeRecord;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GradeRepository extends MongoRepository<GradeRecord, String> {
    List<GradeRecord> findByRegistrationNumber(String registrationNumber);
    Optional<GradeRecord> findByRegistrationNumberAndCourseCode(String registrationNumber, String courseCode);
    List<GradeRecord> findByCourseCode(String courseCode);
}
