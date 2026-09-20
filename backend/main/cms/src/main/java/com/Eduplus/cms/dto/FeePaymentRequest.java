package com.Eduplus.cms.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeePaymentRequest {
    @NotBlank(message = "Student Registration Number is required")
    private String registrationNumber;

    @NotNull(message = "Payment Amount is required")
    @Min(value = 100, message = "Minimum payment amount is 100")
    private Double amountPaid;

    @NotBlank(message = "Payment Head is required")
    private String feeHead; // e.g., 'Tuition Fee', 'Development Fee', 'Exam Fee', 'Hostel Fee'

    @NotBlank(message = "Payment Mode is required")
    private String paymentMode; // 'RAZORPAY_UPI' | 'NET_BANKING' | 'CREDIT_CARD'

    private String transactionRef;
}
