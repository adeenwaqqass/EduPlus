package com.Eduplus.cms.service;

import com.Eduplus.cms.dto.FacultyDTO;
import com.Eduplus.cms.exception.ResourceNotFoundException;
import com.Eduplus.cms.model.Faculty;
import com.Eduplus.cms.repository.FacultyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FacultyService {

    private final FacultyRepository facultyRepository;

    public List<FacultyDTO> getAllFaculties() {
        return facultyRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public FacultyDTO getFacultyById(String facultyId) {
        Faculty faculty = facultyRepository.findByFacultyId(facultyId)
                .orElseThrow(() -> new ResourceNotFoundException("Faculty member not found with ID: " + facultyId));
        return mapToDTO(faculty);
    }

    public FacultyDTO saveOrUpdateFaculty(FacultyDTO dto) {
        Faculty faculty = facultyRepository.findByFacultyId(dto.getFacultyId())
                .orElse(new Faculty());

        faculty.setFacultyId(dto.getFacultyId());
        faculty.setName(dto.getName());
        faculty.setDesignation(dto.getDesignation());
        faculty.setDepartment(dto.getDepartment());
        faculty.setEmail(dto.getEmail());
        faculty.setPhone(dto.getPhone());
        faculty.setQualification(dto.getQualification());
        faculty.setSpecialization(dto.getSpecialization());
        faculty.setOfficeLocation(dto.getOfficeLocation());
        faculty.setJoiningYear(dto.getJoiningYear());
        faculty.setExperienceYears(dto.getExperienceYears());
        faculty.setAvatar(dto.getAvatar());
        faculty.setAssignedCourses(dto.getAssignedCourses());

        Faculty saved = facultyRepository.save(faculty);
        return mapToDTO(saved);
    }

    private FacultyDTO mapToDTO(Faculty f) {
        return FacultyDTO.builder()
                .id(f.getId())
                .facultyId(f.getFacultyId())
                .name(f.getName())
                .designation(f.getDesignation())
                .department(f.getDepartment())
                .email(f.getEmail())
                .phone(f.getPhone())
                .qualification(f.getQualification())
                .specialization(f.getSpecialization())
                .officeLocation(f.getOfficeLocation())
                .joiningYear(f.getJoiningYear())
                .experienceYears(f.getExperienceYears())
                .avatar(f.getAvatar())
                .assignedCourses(f.getAssignedCourses())
                .build();
    }
}
