package com.Eduplus.cms.service;

import com.Eduplus.cms.dto.FeePaymentRequest;
import com.Eduplus.cms.dto.FeeStatementDTO;
import com.Eduplus.cms.dto.StudentFeeRosterDTO;
import com.Eduplus.cms.exception.ResourceNotFoundException;
import com.Eduplus.cms.exception.UnauthorizedAccessException;
import com.Eduplus.cms.model.FeeStatement;
import com.Eduplus.cms.model.Student;
import com.Eduplus.cms.repository.FeeRepository;
import com.Eduplus.cms.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeeService {

    private final FeeRepository feeRepository;
    private final StudentRepository studentRepository;

    public List<StudentFeeRosterDTO> getDepartmentStudentFeeRoster() {
        List<Student> students = studentRepository.findAll();
        List<StudentFeeRosterDTO> roster = new ArrayList<>();

        for (Student st : students) {
            FeeStatement fee = feeRepository.findByRegistrationNumber(st.getRegistrationNumber()).orElse(null);
            double receivable = fee != null && fee.getTotalReceivable() != null ? fee.getTotalReceivable() : 145000.0;
            double paid = fee != null && fee.getTotalPaid() != null ? fee.getTotalPaid() : 120000.0;
            double dues = fee != null && fee.getPendingDues() != null ? fee.getPendingDues() : 25000.0;

            roster.add(StudentFeeRosterDTO.builder()
                    .studentId(st.getId())
                    .name(st.getName())
                    .registrationNumber(st.getRegistrationNumber())
                    .branch(st.getBranch() != null ? st.getBranch() : "COMPUTER ENGINEERING")
                    .semester(st.getSemester() != null ? st.getSemester() : "Semester VII")
                    .totalReceivable(receivable)
                    .totalPaid(paid)
                    .pendingDues(dues)
                    .paymentStatus(dues <= 0 ? "PAID" : paid > 0 ? "PARTIAL" : "OVERDUE")
                    .build());
        }

        return roster;
    }

    public FeeStatementDTO getStudentFeeStatement(String regNo) {
        Student student = studentRepository.findByRegistrationNumber(regNo)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found: " + regNo));

        FeeStatement fee = feeRepository.findByRegistrationNumber(regNo)
                .orElseGet(() -> createSampleFeeStatement(student));

        return mapToDTO(fee);
    }

    public String processStudentFeePayment(FeePaymentRequest request, String userRole) {
        if (!"student".equalsIgnoreCase(userRole)) {
            throw new UnauthorizedAccessException("Only Students are authorized to make fee payments. Faculty and Admin roles can only view student fee rosters.");
        }

        FeeStatement fee = feeRepository.findByRegistrationNumber(request.getRegistrationNumber())
                .orElseThrow(() -> new ResourceNotFoundException("Fee account not found for: " + request.getRegistrationNumber()));

        double newPaid = (fee.getTotalPaid() != null ? fee.getTotalPaid() : 0.0) + request.getAmountPaid();
        double newDues = Math.max(0.0, (fee.getTotalReceivable() != null ? fee.getTotalReceivable() : 145000.0) - newPaid - (fee.getScholarshipAdjustment() != null ? fee.getScholarshipAdjustment() : 0.0));

        fee.setTotalPaid(newPaid);
        fee.setPendingDues(newDues);
        fee.setOverallStatus(newDues <= 0 ? "PAID" : "PARTIAL");

        if (fee.getPaymentHistory() == null) fee.setPaymentHistory(new ArrayList<>());
        fee.getPaymentHistory().add(0, FeeStatement.PaymentRecord.builder()
                .transactionId("TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .date(LocalDate.now().toString())
                .amount(request.getAmountPaid())
                .paymentMode(request.getPaymentMode())
                .feeHead(request.getFeeHead())
                .status("SUCCESS")
                .build());

        feeRepository.save(fee);
        return "Payment of $" + request.getAmountPaid() + " processed successfully for " + request.getRegistrationNumber();
    }

    private FeeStatement createSampleFeeStatement(Student st) {
        List<FeeStatement.FeeHeadItem> heads = List.of(
                FeeStatement.FeeHeadItem.builder().feeHead("Tuition Fee").totalAmount(95000.0).paidAmount(80000.0).dueAmount(15000.0).status("PARTIAL").build(),
                FeeStatement.FeeHeadItem.builder().feeHead("Development Fee").totalAmount(25000.0).paidAmount(25000.0).dueAmount(0.0).status("PAID").build(),
                FeeStatement.FeeHeadItem.builder().feeHead("Examination Fee").totalAmount(15000.0).paidAmount(15000.0).dueAmount(0.0).status("PAID").build(),
                FeeStatement.FeeHeadItem.builder().feeHead("Hostel & Dorm Fee").totalAmount(10000.0).paidAmount(0.0).dueAmount(10000.0).status("OVERDUE").build()
        );

        List<FeeStatement.PaymentRecord> history = List.of(
                FeeStatement.PaymentRecord.builder().transactionId("TXN-984210").date("2026-08-15").amount(80000.0).paymentMode("RAZORPAY_UPI").feeHead("Tuition Fee").status("SUCCESS").build(),
                FeeStatement.PaymentRecord.builder().transactionId("TXN-741258").date("2026-07-10").amount(40000.0).paymentMode("NET_BANKING").feeHead("Development & Exam Fee").status("SUCCESS").build()
        );

        return FeeStatement.builder()
                .registrationNumber(st.getRegistrationNumber())
                .studentName(st.getName())
                .branch(st.getBranch())
                .academicSession("WINTER 2026")
                .totalReceivable(145000.0)
                .scholarshipAdjustment(10000.0)
                .totalPaid(120000.0)
                .pendingDues(15000.0)
                .overallStatus("PARTIAL")
                .feeBreakdown(heads)
                .paymentHistory(history)
                .build();
    }

    private FeeStatementDTO mapToDTO(FeeStatement fee) {
        List<FeeStatementDTO.FeeHeadBreakdown> heads = fee.getFeeBreakdown() != null ?
                fee.getFeeBreakdown().stream().map(h -> FeeStatementDTO.FeeHeadBreakdown.builder()
                        .feeHead(h.getFeeHead())
                        .totalAmount(h.getTotalAmount())
                        .paidAmount(h.getPaidAmount())
                        .dueAmount(h.getDueAmount())
                        .status(h.getStatus())
                        .build()).collect(Collectors.toList()) : List.of();

        List<FeeStatementDTO.PaymentTransactionHistory> history = fee.getPaymentHistory() != null ?
                fee.getPaymentHistory().stream().map(p -> FeeStatementDTO.PaymentTransactionHistory.builder()
                        .transactionId(p.getTransactionId())
                        .date(p.getDate())
                        .amount(p.getAmount())
                        .paymentMode(p.getPaymentMode())
                        .feeHead(p.getFeeHead())
                        .status(p.getStatus())
                        .build()).collect(Collectors.toList()) : List.of();

        return FeeStatementDTO.builder()
                .studentName(fee.getStudentName())
                .registrationNumber(fee.getRegistrationNumber())
                .branch(fee.getBranch())
                .academicSession(fee.getAcademicSession())
                .totalReceivable(fee.getTotalReceivable())
                .scholarshipAdjustment(fee.getScholarshipAdjustment())
                .totalPaid(fee.getTotalPaid())
                .pendingDues(fee.getPendingDues())
                .overallStatus(fee.getOverallStatus())
                .feeBreakdown(heads)
                .paymentHistory(history)
                .build();
    }
}
