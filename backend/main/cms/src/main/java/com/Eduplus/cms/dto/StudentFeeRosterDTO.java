package com.Eduplus.cms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentFeeRosterDTO {
    private String studentId;
    private String name;
    private String registrationNumber;
    private String branch;
    private String semester;
    private Double totalReceivable;
    private Double totalPaid;
    private Double pendingDues;
    private String paymentStatus; // 'PAID' | 'PARTIAL' | 'OVERDUE'
}
