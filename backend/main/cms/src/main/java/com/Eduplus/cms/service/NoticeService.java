package com.Eduplus.cms.service;

import com.Eduplus.cms.dto.NoticeDTO;
import com.Eduplus.cms.exception.ResourceNotFoundException;
import com.Eduplus.cms.model.Notice;
import com.Eduplus.cms.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public List<NoticeDTO> getAllNotices() {
        return noticeRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public NoticeDTO createNotice(NoticeDTO dto) {
        Notice notice = Notice.builder()
                .title(dto.getTitle())
                .category(dto.getCategory())
                .priority(dto.getPriority() != null ? dto.getPriority() : "normal")
                .content(dto.getContent())
                .author(dto.getAuthor() != null ? dto.getAuthor() : "Academic Office")
                .date(dto.getDate() != null ? dto.getDate() : "Just now")
                .isPinned(dto.getIsPinned() != null ? dto.getIsPinned() : false)
                .attachment(dto.getAttachment())
                .build();

        Notice saved = noticeRepository.save(notice);
        return mapToDTO(saved);
    }

    private NoticeDTO mapToDTO(Notice n) {
        return NoticeDTO.builder()
                .id(n.getId())
                .title(n.getTitle())
                .category(n.getCategory())
                .priority(n.getPriority())
                .content(n.getContent())
                .author(n.getAuthor())
                .date(n.getDate())
                .isPinned(n.getIsPinned())
                .attachment(n.getAttachment())
                .build();
    }
}
