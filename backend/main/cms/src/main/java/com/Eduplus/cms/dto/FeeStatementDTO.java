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
public class FeeStatementDTO {
    private String studentName;
    private String registrationNumber;
    private String branch;
    private String academicSession;
    
    private Double totalReceivable;
    private Double scholarshipAdjustment;
    private Double totalPaid;
    private Double pendingDues;
    private String overallStatus; // 'PAID' | 'PARTIAL' | 'OVERDUE'

    private List<FeeHeadBreakdown> feeBreakdown;
    private List<PaymentTransactionHistory> paymentHistory;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class FeeHeadBreakdown {
        private String feeHead;
        private Double totalAmount;
        private Double paidAmount;
        private Double dueAmount;
        private String status;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PaymentTransactionHistory {
        private String transactionId;
        private String date;
        private Double amount;
        private String paymentMode;
        private String feeHead;
        private String status;
    }
}
