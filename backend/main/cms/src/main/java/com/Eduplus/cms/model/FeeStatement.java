package com.Eduplus.cms.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "fees")
public class FeeStatement {
    @Id
    private String id;
    private String registrationNumber;
    private String studentName;
    private String branch;
    private String academicSession;
    
    private Double totalReceivable;
    private Double scholarshipAdjustment;
    private Double totalPaid;
    private Double pendingDues;
    private String overallStatus; // 'PAID' | 'PARTIAL' | 'OVERDUE'

    private List<FeeHeadItem> feeBreakdown;
    private List<PaymentRecord> paymentHistory;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class FeeHeadItem {
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
    public static class PaymentRecord {
        private String transactionId;
        private String date;
        private Double amount;
        private String paymentMode;
        private String feeHead;
        private String status;
    }
}
