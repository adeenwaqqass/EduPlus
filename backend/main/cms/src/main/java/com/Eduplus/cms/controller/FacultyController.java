package com.Eduplus.cms.controller;

import com.Eduplus.cms.dto.ApiResponse;
import com.Eduplus.cms.dto.FacultyDTO;
import com.Eduplus.cms.service.FacultyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculties")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class FacultyController {

    private final FacultyService facultyService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<FacultyDTO>>> getAllFaculties() {
        return ResponseEntity.ok(ApiResponse.success(facultyService.getAllFaculties(), "Faculties retrieved successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<FacultyDTO>> getFacultyById(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success(facultyService.getFacultyById(id), "Faculty retrieved successfully"));
    }
}
