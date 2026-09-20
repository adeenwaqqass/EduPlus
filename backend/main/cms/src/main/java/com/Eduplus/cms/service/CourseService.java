package com.Eduplus.cms.service;

import com.Eduplus.cms.dto.CourseDTO;
import com.Eduplus.cms.dto.CourseRegistrationRequest;
import com.Eduplus.cms.exception.ResourceNotFoundException;
import com.Eduplus.cms.model.Course;
import com.Eduplus.cms.model.Student;
import com.Eduplus.cms.repository.CourseRepository;
import com.Eduplus.cms.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;

    public List<CourseDTO> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public CourseDTO getCourseByCode(String code) {
        Course course = courseRepository.findByCourseCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + code));
        return mapToDTO(course);
    }

    public CourseDTO registerStudentForCourses(CourseRegistrationRequest request) {
        Student student = studentRepository.findByRegistrationNumber(request.getRegistrationNumber())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found: " + request.getRegistrationNumber()));

        student.setEnrolledCourses(request.getCourseCodes());
        studentRepository.save(student);

        // Return first registered course details
        return getCourseByCode(request.getCourseCodes().get(0));
    }

    private CourseDTO mapToDTO(Course c) {
        return CourseDTO.builder()
                .id(c.getId())
                .courseCode(c.getCourseCode())
                .title(c.getTitle())
                .credits(c.getCredits())
                .department(c.getDepartment())
                .semester(c.getSemester())
                .facultyName(c.getFacultyName())
                .facultyId(c.getFacultyId())
                .totalConductedLectures(c.getTotalConductedLectures())
                .enrolledStudentsCount(c.getEnrolledStudentsCount())
                .type(c.getType())
                .syllabusUrl(c.getSyllabusUrl())
                .build();
    }
}
