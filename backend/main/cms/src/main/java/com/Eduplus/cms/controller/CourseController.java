package com.Eduplus.cms.controller;

import com.Eduplus.cms.dto.ApiResponse;
import com.Eduplus.cms.dto.CourseDTO;
import com.Eduplus.cms.dto.CourseRegistrationRequest;
import com.Eduplus.cms.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CourseDTO>>> getAllCourses() {
        return ResponseEntity.ok(ApiResponse.success(courseService.getAllCourses(), "Courses catalog retrieved successfully"));
    }

    @GetMapping("/{code}")
    public ResponseEntity<ApiResponse<CourseDTO>> getCourseByCode(@PathVariable String code) {
        return ResponseEntity.ok(ApiResponse.success(courseService.getCourseByCode(code), "Course details retrieved"));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<CourseDTO>> registerStudentForCourses(@Valid @RequestBody CourseRegistrationRequest request) {
        return ResponseEntity.ok(ApiResponse.success(courseService.registerStudentForCourses(request), "Course registration submitted successfully"));
    }
}
