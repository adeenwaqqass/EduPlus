package com.Eduplus.cms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceRecordDTO {
    private String studentId;
    private String registrationNumber;
    private String studentName;
    private String courseCode;
    private String courseTitle;
    private Integer totalLectures;
    private Integer presentCount;
    private Integer absentCount;
    private Double percentage;
    private String todayStatus; // 'PRESENT' | 'ABSENT'
}
