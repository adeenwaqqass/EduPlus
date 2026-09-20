package com.Eduplus.cms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceMarkRequest {
    @NotBlank(message = "Course Code is required")
    private String courseCode;

    private LocalDate date;
    private String facultyId;
    
    @NotEmpty(message = "Attendance list cannot be empty")
    private List<StudentAttendanceEntry> attendanceList;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class StudentAttendanceEntry {
        private String studentId;
        private String registrationNumber;
        private Boolean present; // true = PRESENT, false = ABSENT
    }
}
