package com.Eduplus.cms.controller;

import com.Eduplus.cms.dto.ApiResponse;
import com.Eduplus.cms.dto.StudentDTO;
import com.Eduplus.cms.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<StudentDTO>>> getAllStudents() {
        return ResponseEntity.ok(ApiResponse.success(studentService.getAllStudents(), "Students retrieved successfully"));
    }

    @GetMapping("/{regNo}")
    public ResponseEntity<ApiResponse<StudentDTO>> getStudentByRegNumber(@PathVariable String regNo) {
        return ResponseEntity.ok(ApiResponse.success(studentService.getStudentByRegNumber(regNo), "Student profile retrieved"));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<StudentDTO>> saveOrUpdateStudent(@RequestBody StudentDTO dto) {
        return ResponseEntity.ok(ApiResponse.success(studentService.saveOrUpdateStudent(dto), "Student profile updated successfully"));
    }
}
