package com.Eduplus.cms.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "notices")
public class Notice {
    @Id
    private String id;
    private String title;
    private String category; // 'exam' | 'academic' | 'finance' | 'events'
    private String priority; // 'critical' | 'important' | 'normal'
    private String content;
    private String author;
    private String date;
    private Boolean isPinned;
    private String attachment;
}
