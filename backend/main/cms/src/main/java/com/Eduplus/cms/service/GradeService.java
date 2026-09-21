package com.Eduplus.cms.service;

import com.Eduplus.cms.dto.GradeCardDTO;
import com.Eduplus.cms.dto.GradeEntryRequest;
import com.Eduplus.cms.exception.ResourceNotFoundException;
import com.Eduplus.cms.exception.UnauthorizedAccessException;
import com.Eduplus.cms.model.GradeRecord;
import com.Eduplus.cms.model.Student;
import com.Eduplus.cms.repository.GradeRepository;
import com.Eduplus.cms.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GradeService {

    private final GradeRepository gradeRepository;
    private final StudentRepository studentRepository;

    public GradeCardDTO getStudentGradeCard(String regNo) {
        Student student = studentRepository.findByRegistrationNumber(regNo)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found: " + regNo));

        List<GradeRecord> records = gradeRepository.findByRegistrationNumber(regNo);
        List<GradeCardDTO.CourseGradeItem> courseItems = new ArrayList<>();

        double totalCreditPoints = 0.0;
        int totalCredits = 0;

        if (records.isEmpty()) {
            // Default sample items
            courseItems.add(createSampleGradeItem("CS701", "Deep Learning & Neural Networks", 4, 23, 24, 19, 58));
            courseItems.add(createSampleGradeItem("CS702", "Cloud Computing & DevOps", 4, 21, 22, 18, 54));
            courseItems.add(createSampleGradeItem("CS703", "Cybersecurity & Cryptography", 3, 19, 20, 16, 48));
            courseItems.add(createSampleGradeItem("CS704P", "Major Project Phase - I", 6, 20, 20, 20, 52));
            courseItems.add(createSampleGradeItem("CS705P", "Advanced AI Lab", 2, 18, 19, 18, 50));
            totalCreditPoints = 4*9 + 4*8 + 3*7 + 6*9 + 2*8;
            totalCredits = 4 + 4 + 3 + 6 + 2;
        } else {
            for (GradeRecord gr : records) {
                int crd = gr.getCourseCode().endsWith("P") ? 6 : (gr.getCourseCode().equals("CS705P") ? 2 : 4);
                if (gr.getCourseCode().equals("CS703")) crd = 3;
                
                int pts = gr.getGradePoints() != null ? gr.getGradePoints() : calculateSPPUGradePoint(gr.getTotalMarks() != null ? gr.getTotalMarks() : 70);
                totalCreditPoints += (pts * crd);
                totalCredits += crd;

                courseItems.add(GradeCardDTO.CourseGradeItem.builder()
                        .courseCode(gr.getCourseCode())
                        .courseTitle("Course " + gr.getCourseCode())
                        .credits(crd)
                        .ut1(gr.getUt1())
                        .ut2(gr.getUt2())
                        .internalScore(gr.getInternalScore())
                        .endSemScore(gr.getEndSemScore())
                        .totalMarks(gr.getTotalMarks())
                        .letterGrade(gr.getLetterGrade() != null ? gr.getLetterGrade() : calculateSPPULetterGrade(gr.getTotalMarks()))
                        .gradePoints(pts)
                        .build());
            }
        }

        double computedSgpa = totalCredits > 0 ? (Math.round((totalCreditPoints / totalCredits) * 100.0) / 100.0) : 7.50;

        return GradeCardDTO.builder()
                .studentName(student.getName())
                .registrationNumber(student.getRegistrationNumber())
                .rollNumber(student.getRollNumber())
                .branch(student.getBranch())
                .academicSession(student.getAcademicSession() != null ? student.getAcademicSession() : "WINTER 2026")
                .semesterTitle(student.getSemester() != null ? student.getSemester() : "Semester VII")
                .sgpa(student.getSgpa() != null ? student.getSgpa() : computedSgpa)
                .cgpa(student.getCgpa() != null ? student.getCgpa() : 7.25)
                .courses(courseItems)
                .build();
    }

    public String updateGradeMarks(GradeEntryRequest request, String userRole) {
        GradeRecord record = gradeRepository.findByRegistrationNumberAndCourseCode(request.getRegistrationNumber(), request.getCourseCode())
                .orElse(GradeRecord.builder()
                        .registrationNumber(request.getRegistrationNumber())
                        .courseCode(request.getCourseCode())
                        .academicSession(request.getAcademicSession() != null ? request.getAcademicSession() : "WINTER 2026")
                        .build());

        if ("faculty".equalsIgnoreCase(userRole)) {
            if (request.getEndSemScore() != null) {
                throw new UnauthorizedAccessException("Faculty members are restricted from entering End-Sem External Exam marks. End-Sem marks can only be entered by Admin/HOD.");
            }
            if (request.getUt1() != null) record.setUt1(request.getUt1());
            if (request.getUt2() != null) record.setUt2(request.getUt2());
            if (request.getInternalScore() != null) record.setInternalScore(request.getInternalScore());
        } else if ("admin".equalsIgnoreCase(userRole)) {
            if (request.getUt1() != null) record.setUt1(request.getUt1());
            if (request.getUt2() != null) record.setUt2(request.getUt2());
            if (request.getInternalScore() != null) record.setInternalScore(request.getInternalScore());
            if (request.getEndSemScore() != null) record.setEndSemScore(request.getEndSemScore());
        } else {
            throw new UnauthorizedAccessException("Students cannot enter or modify exam marks.");
        }

        int internal = record.getInternalScore() != null ? record.getInternalScore() : 18;
        int endSem = record.getEndSemScore() != null ? record.getEndSemScore() : 52;
        int total = Math.min(100, internal + endSem);
        record.setTotalMarks(total);

        record.setLetterGrade(calculateSPPULetterGrade(total));
        record.setGradePoints(calculateSPPUGradePoint(total));

        gradeRepository.save(record);
        return "Grade entry updated successfully for student " + request.getRegistrationNumber();
    }

    private static int calculateSPPUGradePoint(Integer marks) {
        if (marks == null) return 0;
        if (marks >= 80) return 10;
        if (marks >= 70) return 9;
        if (marks >= 60) return 8;
        if (marks >= 55) return 7;
        if (marks >= 50) return 6;
        if (marks >= 45) return 5;
        if (marks >= 40) return 4;
        return 0;
    }

    private static String calculateSPPULetterGrade(Integer marks) {
        if (marks == null) return "F";
        if (marks >= 80) return "O";
        if (marks >= 70) return "A+";
        if (marks >= 60) return "A";
        if (marks >= 55) return "B+";
        if (marks >= 50) return "B";
        if (marks >= 45) return "C";
        if (marks >= 40) return "P";
        return "F";
    }

    private GradeCardDTO.CourseGradeItem createSampleGradeItem(String code, String title, int credits, int ut1, int ut2, int internal, int endSem) {
        int total = Math.min(100, internal + endSem);
        return GradeCardDTO.CourseGradeItem.builder()
                .courseCode(code)
                .courseTitle(title)
                .credits(credits)
                .ut1(ut1)
                .ut2(ut2)
                .internalScore(internal)
                .endSemScore(endSem)
                .totalMarks(total)
                .letterGrade(calculateSPPULetterGrade(total))
                .gradePoints(calculateSPPUGradePoint(total))
                .build();
    }
}
