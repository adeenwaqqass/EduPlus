package com.Eduplus.cms.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "attendance")
public class AttendanceRecord {
    @Id
    private String id;
    private String studentId;
    private String registrationNumber;
    private String courseCode;
    private LocalDate date;
    private Boolean present; // true = PRESENT, false = ABSENT
    private String facultyId;
}
