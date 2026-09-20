package com.Eduplus.cms.repository;

import com.Eduplus.cms.model.AttendanceRecord;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends MongoRepository<AttendanceRecord, String> {
    List<AttendanceRecord> findByRegistrationNumber(String registrationNumber);
    List<AttendanceRecord> findByCourseCode(String courseCode);
    List<AttendanceRecord> findByRegistrationNumberAndCourseCode(String registrationNumber, String courseCode);
    List<AttendanceRecord> findByCourseCodeAndDate(String courseCode, LocalDate date);
}
