package com.Eduplus.cms.controller;

import com.Eduplus.cms.dto.ApiResponse;
import com.Eduplus.cms.dto.AttendanceMarkRequest;
import com.Eduplus.cms.dto.AttendanceRecordDTO;
import com.Eduplus.cms.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class AttendanceController {

    private final AttendanceService attendanceService;

    @GetMapping("/subject/{courseCode}")
    public ResponseEntity<ApiResponse<List<AttendanceRecordDTO>>> getRosterAttendanceForSubject(@PathVariable String courseCode) {
        return ResponseEntity.ok(ApiResponse.success(attendanceService.getRosterAttendanceForSubject(courseCode), "Roster attendance history retrieved"));
    }

    @PostMapping("/mark")
    public ResponseEntity<ApiResponse<String>> markDailyAttendance(@RequestBody AttendanceMarkRequest request) {
        return ResponseEntity.ok(ApiResponse.success(attendanceService.markDailyAttendance(request), "Attendance marked successfully"));
    }
}
