package com.Eduplus.cms.service;

import com.Eduplus.cms.dto.StudentDTO;
import com.Eduplus.cms.exception.ResourceNotFoundException;
import com.Eduplus.cms.model.Student;
import com.Eduplus.cms.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public StudentDTO getStudentByRegNumber(String regNo) {
        Student student = studentRepository.findByRegistrationNumber(regNo)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with Registration Number: " + regNo));
        return mapToDTO(student);
    }

    public StudentDTO saveOrUpdateStudent(StudentDTO dto) {
        Student student = studentRepository.findByRegistrationNumber(dto.getRegistrationNumber())
                .orElse(new Student());

        student.setName(dto.getName());
        student.setRegistrationNumber(dto.getRegistrationNumber());
        student.setRollNumber(dto.getRollNumber());
        student.setBranch(dto.getBranch());
        student.setSemester(dto.getSemester());
        student.setAcademicBatch(dto.getAcademicBatch());
        student.setClassSection(dto.getClassSection());
        student.setEmail(dto.getEmail());
        student.setPhone(dto.getPhone());
        student.setAvatar(dto.getAvatar());
        student.setCgpa(dto.getCgpa());
        student.setAttendancePercentage(dto.getAttendancePercentage());
        student.setRiskLevel(dto.getRiskLevel() != null ? dto.getRiskLevel() : "NORMAL");
        student.setRiskScore(dto.getRiskScore() != null ? dto.getRiskScore() : 15.0);
        student.setParentName(dto.getParentName());
        student.setParentPhone(dto.getParentPhone());
        student.setAddress(dto.getAddress());
        student.setHostelRoom(dto.getHostelRoom());
        student.setEnrolledCourses(dto.getEnrolledCourses());

        Student saved = studentRepository.save(student);
        return mapToDTO(saved);
    }

    private StudentDTO mapToDTO(Student st) {
        return StudentDTO.builder()
                .id(st.getId())
                .name(st.getName())
                .registrationNumber(st.getRegistrationNumber())
                .rollNumber(st.getRollNumber())
                .branch(st.getBranch())
                .semester(st.getSemester())
                .academicBatch(st.getAcademicBatch())
                .classSection(st.getClassSection())
                .email(st.getEmail())
                .phone(st.getPhone())
                .avatar(st.getAvatar())
                .cgpa(st.getCgpa())
                .attendancePercentage(st.getAttendancePercentage())
                .riskLevel(st.getRiskLevel())
                .riskScore(st.getRiskScore())
                .parentName(st.getParentName())
                .parentPhone(st.getParentPhone())
                .address(st.getAddress())
                .hostelRoom(st.getHostelRoom())
                .enrolledCourses(st.getEnrolledCourses())
                .build();
    }
}
