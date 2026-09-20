package com.Eduplus.cms.controller;

import com.Eduplus.cms.dto.ApiResponse;
import com.Eduplus.cms.dto.GradeCardDTO;
import com.Eduplus.cms.dto.GradeEntryRequest;
import com.Eduplus.cms.service.GradeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/grades")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class GradeController {

    private final GradeService gradeService;

    @GetMapping("/card/{regNo}")
    public ResponseEntity<ApiResponse<GradeCardDTO>> getStudentGradeCard(@PathVariable String regNo) {
        return ResponseEntity.ok(ApiResponse.success(gradeService.getStudentGradeCard(regNo), "Student grade card retrieved successfully"));
    }

    @PostMapping("/update")
    public ResponseEntity<ApiResponse<String>> updateGradeMarks(
            @Valid @RequestBody GradeEntryRequest request,
            @RequestHeader(value = "X-User-Role", defaultValue = "faculty") String userRole) {
        String msg = gradeService.updateGradeMarks(request, userRole);
        return ResponseEntity.ok(ApiResponse.success(msg, msg));
    }
}
