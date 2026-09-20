package com.Eduplus.cms.service;

import com.Eduplus.cms.model.Course;
import com.Eduplus.cms.model.Notice;
import com.Eduplus.cms.model.Student;
import com.Eduplus.cms.model.User;
import com.Eduplus.cms.repository.CourseRepository;
import com.Eduplus.cms.repository.NoticeRepository;
import com.Eduplus.cms.repository.StudentRepository;
import com.Eduplus.cms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final NoticeRepository noticeRepository;

    @Override
    public void run(String... args) throws Exception {
        // Seed Users if empty
        if (userRepository.count() == 0) {
            userRepository.saveAll(List.of(
                    User.builder()
                            .name("MR. ADEEN WAQQAS AHMED SHAHZAD AHMED")
                            .shortName("ADEEN")
                            .email("adeen.waqqas@athena.edu")
                            .password("password123")
                            .role("student")
                            .registrationNumber("23ACOE1121163")
                            .department("COMPUTER ENGINEERING")
                            .semester("Semester VII (WINTER 2026)")
                            .avatar("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80")
                            .build(),
                    User.builder()
                            .name("Prof. Sarah Jenkins")
                            .shortName("SARAH")
                            .email("sarah.jenkins@athena.edu")
                            .password("password123")
                            .role("faculty")
                            .registrationNumber("FAC-02")
                            .department("COMPUTER SCIENCE & ENGINEERING")
                            .semester("Faculty / Educator")
                            .avatar("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80")
                            .build(),
                    User.builder()
                            .name("Dr. James Miller (HOD & Admin)")
                            .shortName("MILLER")
                            .email("james.miller@athena.edu")
                            .password("password123")
                            .role("admin")
                            .registrationNumber("ADM-01")
                            .department("REGISTRAR & DEAN OFFICE")
                            .semester("Head of Department / Admin")
                            .avatar("https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80")
                            .build()
            ));
        }

        // Seed Primary Student if empty
        if (studentRepository.count() == 0) {
            studentRepository.save(Student.builder()
                    .name("MR. ADEEN WAQQAS AHMED SHAHZAD AHMED")
                    .registrationNumber("23ACOE1121163")
                    .rollNumber("AU7")
                    .branch("COMPUTER ENGINEERING")
                    .semester("Semester VII")
                    .academicBatch("2023-2027")
                    .classSection("A")
                    .email("adeen.waqqas@athena.edu")
                    .cgpa(6.23)
                    .attendancePercentage(88.4)
                    .riskLevel("NORMAL")
                    .riskScore(12.5)
                    .enrolledCourses(List.of("CS701", "CS702", "CS703", "CS704P", "CS705P"))
                    .build());
        }

        // Seed Courses if empty
        if (courseRepository.count() == 0) {
            courseRepository.saveAll(List.of(
                    Course.builder().courseCode("CS701").title("DEEP LEARNING & NEURAL NETWORKS").credits(4).department("COMPUTER SCIENCE").facultyName("Prof. Sarah Jenkins").totalConductedLectures(28).enrolledStudentsCount(62).type("CORE").build(),
                    Course.builder().courseCode("CS702").title("CLOUD COMPUTING & DEVOPS").credits(4).department("COMPUTER SCIENCE").facultyName("Prof. Sarah Jenkins").totalConductedLectures(26).enrolledStudentsCount(62).type("CORE").build(),
                    Course.builder().courseCode("CS703").title("CYBERSECURITY & CRYPTOGRAPHY").credits(3).department("COMPUTER SCIENCE").facultyName("Prof. Sarah Jenkins").totalConductedLectures(24).enrolledStudentsCount(60).type("CORE").build(),
                    Course.builder().courseCode("CS704P").title("MAJOR PROJECT PHASE - I").credits(6).department("COMPUTER SCIENCE").facultyName("Dr. James Miller").totalConductedLectures(14).enrolledStudentsCount(62).type("PROJECT").build(),
                    Course.builder().courseCode("CS705P").title("ADVANCED AI LAB").credits(2).department("COMPUTER SCIENCE").facultyName("Prof. Sarah Jenkins").totalConductedLectures(28).enrolledStudentsCount(62).type("LAB").build()
            ));
        }

        // Seed Notices if empty
        if (noticeRepository.count() == 0) {
            noticeRepository.saveAll(List.of(
                    Notice.builder().title("Midterm Examination Schedule & Hall Ticket Distribution").category("exam").priority("important").content("Fall 2026 Midterm examinations will commence on October 15th.").author("Office of the Controller of Examinations").date("2 hours ago").isPinned(true).build(),
                    Notice.builder().title("CRITICAL: Attendance Advisory Notice for Low-Attendance Students").category("academic").priority("critical").content("EduPlus Achilles 1.0 analytics has flagged students with attendance under 75%.").author("Academic Registrar & Dean Office").date("4 hours ago").isPinned(true).build()
            ));
        }
    }
}
