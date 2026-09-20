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

        if (records.isEmpty()) {
            // Default sample items
            courseItems.add(createSampleGradeItem("CS701", "Deep Learning & Neural Networks", 4, 23, 24, 19, 88));
            courseItems.add(createSampleGradeItem("CS702", "Cloud Computing & DevOps", 4, 21, 22, 18, 82));
            courseItems.add(createSampleGradeItem("CS703", "Cybersecurity & Cryptography", 3, 19, 20, 16, 74));
        } else {
            for (GradeRecord gr : records) {
                courseItems.add(GradeCardDTO.CourseGradeItem.builder()
                        .courseCode(gr.getCourseCode())
                        .courseTitle("Course " + gr.getCourseCode())
                        .credits(4)
                        .ut1(gr.getUt1())
                        .ut2(gr.getUt2())
                        .internalScore(gr.getInternalScore())
                        .endSemScore(gr.getEndSemScore())
                        .totalMarks(gr.getTotalMarks())
                        .letterGrade(gr.getLetterGrade())
                        .gradePoints(gr.getGradePoints())
                        .build());
            }
        }

        return GradeCardDTO.builder()
                .studentName(student.getName())
                .registrationNumber(student.getRegistrationNumber())
                .rollNumber(student.getRollNumber())
                .branch(student.getBranch())
                .academicSession("WINTER 2026")
                .semesterTitle("Semester VII")
                .sgpa(6.48)
                .cgpa(student.getCgpa() != null ? student.getCgpa() : 6.23)
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
            // Faculty can ONLY enter internal assessment & unit test marks (out of 20 each)
            if (request.getEndSemScore() != null) {
                throw new UnauthorizedAccessException("Faculty members are restricted from entering End-Sem External Exam marks. End-Sem marks can only be entered by Admin/HOD.");
            }
            if (request.getUt1() != null) record.setUt1(request.getUt1());
            if (request.getUt2() != null) record.setUt2(request.getUt2());
            if (request.getInternalScore() != null) record.setInternalScore(request.getInternalScore());
        } else if ("admin".equalsIgnoreCase(userRole)) {
            // Admin can enter/edit End-Sem External Exam marks (out of 60) and all components
            if (request.getUt1() != null) record.setUt1(request.getUt1());
            if (request.getUt2() != null) record.setUt2(request.getUt2());
            if (request.getInternalScore() != null) record.setInternalScore(request.getInternalScore());
            if (request.getEndSemScore() != null) record.setEndSemScore(request.getEndSemScore());
        } else {
            throw new UnauthorizedAccessException("Students cannot enter or modify exam marks.");
        }

        // Calculate total
        int internal = record.getInternalScore() != null ? record.getInternalScore() : 18;
        int endSem = record.getEndSemScore() != null ? record.getEndSemScore() : 70;
        int total = Math.min(100, internal + endSem);
        record.setTotalMarks(total);

        if (total >= 90) { record.setLetterGrade("O"); record.setGradePoints(10); }
        else if (total >= 80) { record.setLetterGrade("A+"); record.setGradePoints(9); }
        else if (total >= 70) { record.setLetterGrade("A"); record.setGradePoints(8); }
        else if (total >= 60) { record.setLetterGrade("B+"); record.setGradePoints(7); }
        else if (total >= 50) { record.setLetterGrade("B"); record.setGradePoints(6); }
        else { record.setLetterGrade("F"); record.setGradePoints(0); }

        gradeRepository.save(record);
        return "Grade entry updated successfully for student " + request.getRegistrationNumber();
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
                .letterGrade(total >= 90 ? "O" : total >= 80 ? "A+" : "A")
                .gradePoints(total >= 90 ? 10 : total >= 80 ? 9 : 8)
                .build();
    }
}
