package com.Eduplus.cms.controller;

import com.Eduplus.cms.dto.ApiResponse;
import com.Eduplus.cms.dto.FeedbackDTO;
import com.Eduplus.cms.service.FeedbackService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @GetMapping("/course/{code}")
    public ResponseEntity<ApiResponse<List<FeedbackDTO>>> getFeedbackForCourse(@PathVariable String code) {
        return ResponseEntity.ok(ApiResponse.success(feedbackService.getFeedbackForCourse(code), "Feedback for course " + code + " retrieved successfully"));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<FeedbackDTO>> submitFeedback(@Valid @RequestBody FeedbackDTO dto) {
        return ResponseEntity.ok(ApiResponse.success(feedbackService.submitFeedback(dto), "Feedback submitted successfully"));
    }
}
