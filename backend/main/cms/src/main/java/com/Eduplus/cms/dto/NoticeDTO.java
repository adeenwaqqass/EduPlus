package com.Eduplus.cms.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NoticeDTO {
    private String id;
    
    @NotBlank(message = "Notice title is required")
    private String title;

    @NotBlank(message = "Category is required")
    private String category; // 'exam' | 'academic' | 'finance' | 'events'

    private String priority; // 'critical' | 'important' | 'normal'

    @NotBlank(message = "Notice content is required")
    private String content;

    private String author;
    private String date;
    private Boolean isPinned;
    private String attachment;
}
