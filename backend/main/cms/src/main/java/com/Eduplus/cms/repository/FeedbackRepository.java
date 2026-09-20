package com.Eduplus.cms.repository;

import com.Eduplus.cms.model.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends MongoRepository<Feedback, String> {
    List<Feedback> findByCourseCode(String courseCode);
    List<Feedback> findByFacultyId(String facultyId);
}
