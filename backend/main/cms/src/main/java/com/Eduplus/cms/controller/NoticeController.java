package com.Eduplus.cms.controller;

import com.Eduplus.cms.dto.ApiResponse;
import com.Eduplus.cms.dto.NoticeDTO;
import com.Eduplus.cms.service.NoticeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NoticeController {

    private final NoticeService noticeService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<NoticeDTO>>> getAllNotices() {
        return ResponseEntity.ok(ApiResponse.success(noticeService.getAllNotices(), "Notices retrieved successfully"));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<NoticeDTO>> createNotice(@Valid @RequestBody NoticeDTO dto) {
        return ResponseEntity.ok(ApiResponse.success(noticeService.createNotice(dto), "Notice published successfully"));
    }
}
