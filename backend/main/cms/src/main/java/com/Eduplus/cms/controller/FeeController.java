package com.Eduplus.cms.controller;

import com.Eduplus.cms.dto.ApiResponse;
import com.Eduplus.cms.dto.FeePaymentRequest;
import com.Eduplus.cms.dto.FeeStatementDTO;
import com.Eduplus.cms.dto.StudentFeeRosterDTO;
import com.Eduplus.cms.service.FeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/finance")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FeeController {

    private final FeeService feeService;

    @GetMapping("/roster")
    public ResponseEntity<ApiResponse<List<StudentFeeRosterDTO>>> getDepartmentStudentFeeRoster() {
        return ResponseEntity.ok(ApiResponse.success(feeService.getDepartmentStudentFeeRoster(), "Department student fee roster retrieved successfully"));
    }

    @GetMapping("/statement/{regNo}")
    public ResponseEntity<ApiResponse<FeeStatementDTO>> getStudentFeeStatement(@PathVariable String regNo) {
        return ResponseEntity.ok(ApiResponse.success(feeService.getStudentFeeStatement(regNo), "Student fee statement retrieved successfully"));
    }

    @PostMapping("/pay")
    public ResponseEntity<ApiResponse<String>> processStudentFeePayment(
            @Valid @RequestBody FeePaymentRequest request,
            @RequestHeader(value = "X-User-Role", defaultValue = "student") String userRole) {
        String msg = feeService.processStudentFeePayment(request, userRole);
        return ResponseEntity.ok(ApiResponse.success(msg, msg));
    }
}
