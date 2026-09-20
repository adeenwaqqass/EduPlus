package com.Eduplus.cms.service;

import com.Eduplus.cms.dto.FeedbackDTO;
import com.Eduplus.cms.model.Feedback;
import com.Eduplus.cms.repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public List<FeedbackDTO> getFeedbackForCourse(String courseCode) {
        return feedbackRepository.findByCourseCode(courseCode).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public FeedbackDTO submitFeedback(FeedbackDTO dto) {
        Feedback fb = Feedback.builder()
                .courseCode(dto.getCourseCode())
                .facultyId(dto.getFacultyId())
                .facultyName(dto.getFacultyName())
                .rating(dto.getRating())
                .comments(dto.getComments())
                .feedbackType(dto.getFeedbackType() != null ? dto.getFeedbackType() : "COURSE_EVAL")
                .dateSubmitted(LocalDate.now().toString())
                .build();

        Feedback saved = feedbackRepository.save(fb);
        return mapToDTO(saved);
    }

    private FeedbackDTO mapToDTO(Feedback f) {
        return FeedbackDTO.builder()
                .id(f.getId())
                .courseCode(f.getCourseCode())
                .facultyId(f.getFacultyId())
                .facultyName(f.getFacultyName())
                .rating(f.getRating())
                .comments(f.getComments())
                .feedbackType(f.getFeedbackType())
                .dateSubmitted(f.getDateSubmitted())
                .build();
    }
}
