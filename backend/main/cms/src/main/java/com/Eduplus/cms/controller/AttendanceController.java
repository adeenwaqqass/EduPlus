package com.Eduplus.cms.controller;

import com.Eduplus.cms.dto.ApiResponse;
import com.Eduplus.cms.dto.AttendanceMarkRequest;
import com.Eduplus.cms.dto.AttendanceRecordDTO;
import com.Eduplus.cms.service.AttendanceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AttendanceController {

    private final AttendanceService attendanceService;

    @GetMapping("/roster")
    public ResponseEntity<ApiResponse<List<AttendanceRecordDTO>>> getRosterAttendanceForSubject(
            @RequestParam(defaultValue = "CS701") String courseCode) {
        return ResponseEntity.ok(ApiResponse.success(attendanceService.getRosterAttendanceForSubject(courseCode), "Attendance roster for " + courseCode + " retrieved successfully"));
    }

    @PostMapping("/mark")
    public ResponseEntity<ApiResponse<String>> markDailyAttendance(@Valid @RequestBody AttendanceMarkRequest request) {
        String msg = attendanceService.markDailyAttendance(request);
        return ResponseEntity.ok(ApiResponse.success(msg, msg));
    }
}
