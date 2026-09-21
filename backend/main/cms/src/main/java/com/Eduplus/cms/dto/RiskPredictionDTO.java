package com.Eduplus.cms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RiskPredictionDTO {
    private String studentId;
    private String registrationNumber;
    private String studentName;
    private Double attendancePercentage;
    private Double currentGpa;
    private Double riskScore; // 0 - 100
    private String riskLevel; // 'CRITICAL' | 'IMPORTANT' | 'NORMAL'
    private String detentionStatus; // 'DETAINED' | 'ELIGIBLE'
    private String examEligibility; // 'NOT ELIGIBLE FOR UT & END-SEM' | 'ELIGIBLE FOR ALL EXAMS'
    private Double predictedSgpa;
    private String modelVersion; // 'EduPlus Achilles 1.0'
    private List<String> riskFactors;
    private String recommendedIntervention;
    private String attendanceRecoveryAdvice;
    private String unitTest2Advice;
}
