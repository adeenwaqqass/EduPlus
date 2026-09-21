import json
import random
import os
from datetime import datetime, timedelta

# Set seed for reproducible realistic dataset
random.seed(42)

OUTPUT_DIR = r"d:\EduPlus\backend\Dataset"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# First Names & Last Names Pools for realistic Indian Computer Engineering Students
FIRST_NAMES_MALE = [
    "Adeen", "Aarav", "Rohan", "Aditya", "Vihaan", "Siddharth", "Rahul", "Aryan",
    "Kabir", "Arjun", "Dev", "Ishan", "Kunal", "Yash", "Tanmay", "Atharva", "Dhruv",
    "Aniket", "Pranav", "Varun", "Rishabh", "Harsh", "Shivam", "Nikhil", "Akash",
    "Ayush", "Sameer", "Chaitanya", "Manish", "Gaurav", "Saurabh", "Mayank", "Abhishek",
    "Utkarsh", "Tarun", "Tushar", "Sanket", "Omkar", "Vikas", "Vishal", "Yogesh"
]

FIRST_NAMES_FEMALE = [
    "Aanya", "Ananya", "Riya", "Diya", "Isha", "Neha", "Priya", "Sneha", "Kavya",
    "Tanvi", "Shreya", "Aditi", "Pooja", "Simran", "Meera", "Shruti", "Anushka",
    "Avani", "Khushi", "Mansi", "Prisha", "Rashi", "Sakshi", "Srishti", "Vidhi",
    "Bhavna", "Divya", "Ishita", "Jyoti", "Komal", "Nisha", "Payal", "Radhika"
]

LAST_NAMES = [
    "Shahzad", "Nair", "Sharma", "Verma", "Patel", "Gupta", "Singh", "Joshi",
    "Kulkarni", "Deshmukh", "Mehta", "Chaudhary", "Rao", "Reddy", "Iyer", "Agarwal",
    "Bhat", "Deshpande", "Pawar", "Shinde", "Malhotra", "Kapoor", "Saxena", "Trivedi",
    "Mishra", "Pandey", "Thakur", "Yadav", "Chavan", "Bansal", "Garg", "Jain"
]

CITIES = [
    "Mumbai, Maharashtra", "Pune, Maharashtra", "Nagpur, Maharashtra", "Nashik, Maharashtra",
    "Bengaluru, Karnataka", "Hyderabad, Telangana", "Delhi NCR", "Ahmedabad, Gujarat",
    "Indore, Madhya Pradesh", "Jaipur, Rajasthan", "Chandigarh", "Lucknow, Uttar Pradesh"
]

STREETS = [
    "MG Road", "FC Road", "JM Road", "Baner Road", "Kothrud", "Viman Nagar",
    "Civil Lines", "Ring Road", "Station Road", "Gandhi Nagar", "Green Park"
]

# Faculty Members Dataset (26 Computer Engineering Professors & Educators)
FACULTY_PROFILES = [
    {
        "id": "fac-01",
        "facultyId": "FAC-01",
        "name": "Prof. Sarah Jenkins",
        "shortName": "SARAH",
        "designation": "Professor & AI Lab In-Charge",
        "department": "COMPUTER ENGINEERING",
        "email": "sarah.jenkins@eduplus.edu",
        "phone": "+91 98230 11201",
        "qualification": "Ph.D. in Deep Learning (Stanford / IIT Bombay)",
        "specialization": "Neural Networks, Deep Learning & Generative AI",
        "officeLocation": "Tech Building A, Cabin 304",
        "joiningYear": 2017,
        "experienceYears": 14,
        "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        "assignedCourses": ["23UCOPEL4703B", "23UCOPEP4703B"]
    },
    {
        "id": "fac-02",
        "facultyId": "FAC-02",
        "name": "Prof. Rajesh Kulkarni",
        "shortName": "RAJESH",
        "designation": "Associate Professor & DevOps Lead",
        "department": "COMPUTER ENGINEERING",
        "email": "rajesh.kulkarni@eduplus.edu",
        "phone": "+91 98230 11202",
        "qualification": "M.Tech in Cloud Systems (COEP Pune)",
        "specialization": "Cloud Infrastructure, Kubernetes & DevOps",
        "officeLocation": "Tech Building A, Cabin 308",
        "joiningYear": 2019,
        "experienceYears": 11,
        "avatar": "https://randomuser.me/api/portraits/men/32.jpg",
        "assignedCourses": ["23UCOPCL4713"]
    },
    {
        "id": "fac-03",
        "facultyId": "FAC-03",
        "name": "Dr. Anita Roy",
        "shortName": "ANITA",
        "designation": "Associate Professor & CyberSec Coordinator",
        "department": "COMPUTER ENGINEERING",
        "email": "anita.roy@eduplus.edu",
        "phone": "+91 98230 11203",
        "qualification": "Ph.D. in Cryptography (IISc Bangalore)",
        "specialization": "Network Security, Blockchain & Cryptography",
        "officeLocation": "Tech Building B, Cabin 210",
        "joiningYear": 2018,
        "experienceYears": 12,
        "avatar": "https://randomuser.me/api/portraits/women/44.jpg",
        "assignedCourses": ["23UCOPCL4712"]
    },
    {
        "id": "fac-04",
        "facultyId": "ADM-01",
        "name": "Dr. James Miller (HOD & Admin)",
        "shortName": "MILLER",
        "designation": "Head of Department & Senior Professor",
        "department": "COMPUTER ENGINEERING",
        "email": "james.miller@eduplus.edu",
        "phone": "+91 98230 11200",
        "qualification": "Ph.D. in Computer Science & Engineering",
        "specialization": "Distributed Systems & Academic Administration",
        "officeLocation": "HOD Wing, Main Building 101",
        "joiningYear": 2012,
        "experienceYears": 22,
        "avatar": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
        "assignedCourses": ["23UCOELP4703"]
    },
    {
        "id": "fac-05",
        "facultyId": "FAC-05",
        "name": "Prof. Vikram Sharma",
        "shortName": "VIKRAM",
        "designation": "Assistant Professor",
        "department": "COMPUTER ENGINEERING",
        "email": "vikram.sharma@eduplus.edu",
        "phone": "+91 98230 11205",
        "qualification": "M.Tech in Data Science (VNIT Nagpur)",
        "specialization": "Data Structures & Algorithm Design",
        "officeLocation": "Tech Building A, Cabin 205",
        "joiningYear": 2021,
        "experienceYears": 6,
        "avatar": "https://randomuser.me/api/portraits/men/45.jpg",
        "assignedCourses": ["23UCOPEL4705C"]
    },
    {
        "id": "fac-06",
        "facultyId": "FAC-06",
        "name": "Dr. Meera Kulkarni",
        "shortName": "MEERA",
        "designation": "Assistant Professor",
        "department": "COMPUTER ENGINEERING",
        "email": "meera.kulkarni@eduplus.edu",
        "phone": "+91 98230 11206",
        "qualification": "Ph.D. in Natural Language Processing",
        "specialization": "NLP, Large Language Models & Speech Processing",
        "officeLocation": "Tech Building B, Cabin 104",
        "joiningYear": 2020,
        "experienceYears": 8,
        "avatar": "https://randomuser.me/api/portraits/women/68.jpg",
        "assignedCourses": ["23UCOELL4804"]
    },
    {
        "id": "fac-07",
        "facultyId": "FAC-07",
        "name": "Prof. Sanjay Gupta",
        "shortName": "SANJAY",
        "designation": "Assistant Professor",
        "department": "COMPUTER ENGINEERING",
        "email": "sanjay.gupta@eduplus.edu",
        "phone": "+91 98230 11207",
        "qualification": "M.Tech in Software Engineering",
        "specialization": "Web Engineering & Microservices Architecture",
        "officeLocation": "Tech Building A, Cabin 302",
        "joiningYear": 2022,
        "experienceYears": 5,
        "avatar": "https://randomuser.me/api/portraits/men/52.jpg",
        "assignedCourses": ["23UCOPEL4704D"]
    },
    {
        "id": "fac-08",
        "facultyId": "FAC-08",
        "name": "Dr. Arthur Pendelton",
        "shortName": "ARTHUR",
        "designation": "Associate Professor & Robotics Lab Lead",
        "department": "COMPUTER ENGINEERING",
        "email": "arthur.pendelton@eduplus.edu",
        "phone": "+91 98230 11208",
        "qualification": "Ph.D. in Autonomous Systems (MIT)",
        "specialization": "Robotics, Control Systems & Computer Vision",
        "officeLocation": "Robotics Lab, Cabin 102",
        "joiningYear": 2016,
        "experienceYears": 15,
        "avatar": "https://randomuser.me/api/portraits/men/60.jpg",
        "assignedCourses": ["23UCOPEP4703B"]
    },
    {
        "id": "fac-09",
        "facultyId": "FAC-09",
        "name": "Prof. Marcus Vance",
        "shortName": "MARCUS",
        "designation": "Assistant Professor",
        "department": "COMPUTER ENGINEERING",
        "email": "marcus.vance@eduplus.edu",
        "phone": "+91 98230 11209",
        "qualification": "M.Tech in Embedded Systems",
        "specialization": "Digital Logic & IoT Systems",
        "officeLocation": "Tech Building B, Cabin 208",
        "joiningYear": 2020,
        "experienceYears": 7,
        "avatar": "https://randomuser.me/api/portraits/men/71.jpg",
        "assignedCourses": ["23UCOPCP4713"]
    },
    {
        "id": "fac-10",
        "facultyId": "FAC-10",
        "name": "Dr. Emily Noether",
        "shortName": "EMILY",
        "designation": "Professor of Applied Mathematics",
        "department": "COMPUTER ENGINEERING",
        "email": "emily.noether@eduplus.edu",
        "phone": "+91 98230 11210",
        "qualification": "Ph.D. in Applied Mathematics (Oxford)",
        "specialization": "Linear Algebra, Probability & Optimization",
        "officeLocation": "Science Block, Cabin 401",
        "joiningYear": 2015,
        "experienceYears": 18,
        "avatar": "https://randomuser.me/api/portraits/women/55.jpg",
        "assignedCourses": ["23UCOPCP4712"]
    },
    {
        "id": "fac-11",
        "facultyId": "FAC-11",
        "name": "Prof. Alan Poe",
        "shortName": "ALAN",
        "designation": "Assistant Professor & Project Mentor",
        "department": "COMPUTER ENGINEERING",
        "email": "alan.poe@eduplus.edu",
        "phone": "+91 98230 11211",
        "qualification": "M.Tech in System Design",
        "specialization": "Software Architecture & Design Patterns",
        "officeLocation": "Tech Building A, Cabin 108",
        "joiningYear": 2021,
        "experienceYears": 6,
        "avatar": "https://randomuser.me/api/portraits/men/82.jpg",
        "assignedCourses": ["23UCOELP4703"]
    },
    {
        "id": "fac-12",
        "facultyId": "FAC-12",
        "name": "Dr. Alan Turing",
        "shortName": "TURING",
        "designation": "Senior Professor & DBMS Specialist",
        "department": "COMPUTER ENGINEERING",
        "email": "alan.turing@eduplus.edu",
        "phone": "+91 98230 11212",
        "qualification": "Ph.D. in Database Architectures (Cambridge)",
        "specialization": "Relational Databases, NoSQL & Distributed Query Engine",
        "officeLocation": "Main Building 202",
        "joiningYear": 2010,
        "experienceYears": 24,
        "avatar": "https://randomuser.me/api/portraits/men/91.jpg",
        "assignedCourses": ["23UCOPCL4713"]
    },
    {
        "id": "fac-13",
        "facultyId": "FAC-13",
        "name": "Prof. Kavya Joshi",
        "shortName": "KAVYA",
        "designation": "Assistant Professor",
        "department": "COMPUTER ENGINEERING",
        "email": "kavya.joshi@eduplus.edu",
        "phone": "+91 98230 11213",
        "qualification": "M.Tech in Information Technology",
        "specialization": "Operating Systems & System Programming",
        "officeLocation": "Tech Building B, Cabin 305",
        "joiningYear": 2022,
        "experienceYears": 4,
        "avatar": "https://randomuser.me/api/portraits/women/29.jpg",
        "assignedCourses": ["23UCOPCL4712"]
    },
    {
        "id": "fac-14",
        "facultyId": "FAC-14",
        "name": "Dr. Aniket Deshmukh",
        "shortName": "ANIKET",
        "designation": "Associate Professor",
        "department": "COMPUTER ENGINEERING",
        "email": "aniket.deshmukh@eduplus.edu",
        "phone": "+91 98230 11214",
        "qualification": "Ph.D. in Computer Networks",
        "specialization": "High-Speed Networks & SDN Architectures",
        "officeLocation": "Tech Building A, Cabin 402",
        "joiningYear": 2017,
        "experienceYears": 13,
        "avatar": "https://randomuser.me/api/portraits/men/18.jpg",
        "assignedCourses": ["23UCOPEL4705C"]
    },
    {
        "id": "fac-15",
        "facultyId": "FAC-15",
        "name": "Prof. Pooja Patel",
        "shortName": "POOJA",
        "designation": "Assistant Professor",
        "department": "COMPUTER ENGINEERING",
        "email": "pooja.patel@eduplus.edu",
        "phone": "+91 98230 11215",
        "qualification": "M.Tech in Data Analytics",
        "specialization": "Data Mining & Big Data Analytics",
        "officeLocation": "Tech Building B, Cabin 201",
        "joiningYear": 2021,
        "experienceYears": 5,
        "avatar": "https://randomuser.me/api/portraits/women/33.jpg",
        "assignedCourses": ["23UCOELL4804"]
    },
    {
        "id": "fac-16",
        "facultyId": "FAC-16",
        "name": "Dr. Utkarsh Verma",
        "shortName": "UTKARSH",
        "designation": "Associate Professor",
        "department": "COMPUTER ENGINEERING",
        "email": "utkarsh.verma@eduplus.edu",
        "phone": "+91 98230 11216",
        "qualification": "Ph.D. in Theoretical Computer Science",
        "specialization": "Automata Theory & Complexity Classes",
        "officeLocation": "Main Building 305",
        "joiningYear": 2018,
        "experienceYears": 11,
        "avatar": "https://randomuser.me/api/portraits/men/22.jpg",
        "assignedCourses": ["23UCOPEL4704D"]
    },
    {
        "id": "fac-17",
        "facultyId": "FAC-17",
        "name": "Prof. Shreya Bhat",
        "shortName": "SHREYA",
        "designation": "Assistant Professor",
        "department": "COMPUTER ENGINEERING",
        "email": "shreya.bhat@eduplus.edu",
        "phone": "+91 98230 11217",
        "qualification": "M.Tech in Artificial Intelligence",
        "specialization": "Computer Vision & Image Processing",
        "officeLocation": "AI Center Cabin 104",
        "joiningYear": 2022,
        "experienceYears": 4,
        "avatar": "https://randomuser.me/api/portraits/women/24.jpg",
        "assignedCourses": ["23UCOPEP4703B"]
    },
    {
        "id": "fac-18",
        "facultyId": "FAC-18",
        "name": "Dr. Tanmay Rao",
        "shortName": "TANMAY",
        "designation": "Associate Professor",
        "department": "COMPUTER ENGINEERING",
        "email": "tanmay.rao@eduplus.edu",
        "phone": "+91 98230 11218",
        "qualification": "Ph.D. in Parallel Processing",
        "specialization": "High-Performance Computing & CUDA GPU Programming",
        "officeLocation": "Tech Building A, Cabin 501",
        "joiningYear": 2016,
        "experienceYears": 14,
        "avatar": "https://randomuser.me/api/portraits/men/35.jpg",
        "assignedCourses": ["23UCOPCP4713"]
    },
    {
        "id": "fac-19",
        "facultyId": "FAC-19",
        "name": "Prof. Neha Chaudhary",
        "shortName": "NEHA",
        "designation": "Assistant Professor",
        "department": "COMPUTER ENGINEERING",
        "email": "neha.chaudhary@eduplus.edu",
        "phone": "+91 98230 11219",
        "qualification": "M.Tech in Information Security",
        "specialization": "Ethical Hacking & Penetration Testing",
        "officeLocation": "Tech Building B, Cabin 309",
        "joiningYear": 2020,
        "experienceYears": 6,
        "avatar": "https://randomuser.me/api/portraits/women/48.jpg",
        "assignedCourses": ["23UCOPCP4712"]
    },
    {
        "id": "fac-20",
        "facultyId": "FAC-20",
        "name": "Dr. Rohan Sharma",
        "shortName": "ROHAN",
        "designation": "Assistant Professor",
        "department": "COMPUTER ENGINEERING",
        "email": "rohan.sharma@eduplus.edu",
        "phone": "+91 98230 11220",
        "qualification": "Ph.D. in Wireless Networks",
        "specialization": "Cellular Protocols & Sensor Networks",
        "officeLocation": "Tech Building A, Cabin 408",
        "joiningYear": 2019,
        "experienceYears": 9,
        "avatar": "https://randomuser.me/api/portraits/men/58.jpg",
        "assignedCourses": ["23UCOELP4703"]
    },
    {
        "id": "fac-21",
        "facultyId": "FAC-21",
        "name": "Prof. Divya Pawar",
        "shortName": "DIVYA",
        "designation": "Assistant Professor",
        "department": "COMPUTER ENGINEERING",
        "email": "divya.pawar@eduplus.edu",
        "phone": "+91 98230 11221",
        "qualification": "M.Tech in VLSI & Digital Systems",
        "specialization": "Digital Microelectronics & FPGA Programming",
        "officeLocation": "Science Block, Cabin 202",
        "joiningYear": 2021,
        "experienceYears": 5,
        "avatar": "https://randomuser.me/api/portraits/women/52.jpg",
        "assignedCourses": ["23UCOPEP4703B"]
    },
    {
        "id": "fac-22",
        "facultyId": "FAC-22",
        "name": "Dr. Sameer Bansal",
        "shortName": "SAMEER",
        "designation": "Associate Professor",
        "department": "COMPUTER ENGINEERING",
        "email": "sameer.bansal@eduplus.edu",
        "phone": "+91 98230 11222",
        "qualification": "Ph.D. in Reinforcement Learning",
        "specialization": "Deep Q-Learning, Markov Models & AI Decision Making",
        "officeLocation": "AI Center Cabin 201",
        "joiningYear": 2017,
        "experienceYears": 12,
        "avatar": "https://randomuser.me/api/portraits/men/64.jpg",
        "assignedCourses": ["23UCOPCP4713"]
    },
    {
        "id": "fac-23",
        "facultyId": "FAC-23",
        "name": "Prof. Riya Kapoor",
        "shortName": "RIYA",
        "designation": "Assistant Professor",
        "department": "COMPUTER ENGINEERING",
        "email": "riya.kapoor@eduplus.edu",
        "phone": "+91 98230 11223",
        "qualification": "M.Tech in Cloud Security",
        "specialization": "Zero Trust Security & AWS Identity Management",
        "officeLocation": "Tech Building A, Cabin 312",
        "joiningYear": 2022,
        "experienceYears": 4,
        "avatar": "https://randomuser.me/api/portraits/women/62.jpg",
        "assignedCourses": ["23UCOPCP4712"]
    },
    {
        "id": "fac-24",
        "facultyId": "FAC-24",
        "name": "Dr. Harsh Saxena",
        "shortName": "HARSH",
        "designation": "Associate Professor",
        "department": "COMPUTER ENGINEERING",
        "email": "harsh.saxena@eduplus.edu",
        "phone": "+91 98230 11224",
        "qualification": "Ph.D. in Cyber Forensics",
        "specialization": "Malware Analysis & Digital Evidence Collection",
        "officeLocation": "Tech Building B, Cabin 401",
        "joiningYear": 2018,
        "experienceYears": 11,
        "avatar": "https://randomuser.me/api/portraits/men/76.jpg",
        "assignedCourses": ["23UCOPEP4703B"]
    },
    {
        "id": "fac-25",
        "facultyId": "FAC-25",
        "name": "Prof. Ayush Mishra",
        "shortName": "AYUSH",
        "designation": "Assistant Professor",
        "department": "COMPUTER ENGINEERING",
        "email": "ayush.mishra@eduplus.edu",
        "phone": "+91 98230 11225",
        "qualification": "M.Tech in Software Engineering",
        "specialization": "Full-Stack Development & Microservices",
        "officeLocation": "Tech Building A, Cabin 104",
        "joiningYear": 2021,
        "experienceYears": 5,
        "avatar": "https://randomuser.me/api/portraits/men/86.jpg",
        "assignedCourses": ["23UCOPCP4713"]
    },
    {
        "id": "fac-26",
        "facultyId": "FAC-26",
        "name": "Dr. Ananya Trivedi",
        "shortName": "ANANYA",
        "designation": "Associate Professor & Research Chair",
        "department": "COMPUTER ENGINEERING",
        "email": "ananya.trivedi@eduplus.edu",
        "phone": "+91 98230 11226",
        "qualification": "Ph.D. in Machine Learning & Bio-Informatics",
        "specialization": "Predictive Modeling & Statistical AI",
        "officeLocation": "Main Building 402",
        "joiningYear": 2016,
        "experienceYears": 13,
        "avatar": "https://randomuser.me/api/portraits/women/79.jpg",
        "assignedCourses": ["23UCOPCP4712"]
    }
]

COURSES_DATA = [
    {
        "id": "crs-4703b",
        "courseCode": "23UCOPEL4703B",
        "title": "BLOCKCHAIN TECHNOLOGY",
        "credits": 4,
        "department": "COMPUTER ENGINEERING",
        "semester": "VII",
        "facultyName": "Prof. Sarah Jenkins",
        "facultyId": "FAC-01",
        "totalConductedLectures": 43,
        "enrolledStudentsCount": 260,
        "type": "Theory",
        "courseVariant": "23UCOPEL4703B-Bachelor of Technology-23UCOPEL4703B-WINTER 2026-COMP_A"
    },
    {
        "id": "crs-4703b-lab",
        "courseCode": "23UCOPEP4703B",
        "title": "BLOCKCHAIN TECHNOLOGY LAB",
        "credits": 2,
        "department": "COMPUTER ENGINEERING",
        "semester": "VII",
        "facultyName": "Dr. Arthur Pendelton",
        "facultyId": "FAC-08",
        "totalConductedLectures": 14,
        "enrolledStudentsCount": 260,
        "type": "Practical",
        "courseVariant": "23UCOPEP4703B-Bachelor of Technology-23UCOPEP4703B-WINTER 2026-COMP_A1"
    },
    {
        "id": "crs-4713",
        "courseCode": "23UCOPCL4713",
        "title": "CLOUD AND EDGE COMPUTING",
        "credits": 4,
        "department": "COMPUTER ENGINEERING",
        "semester": "VII",
        "facultyName": "Prof. Rajesh Kulkarni",
        "facultyId": "FAC-02",
        "totalConductedLectures": 40,
        "enrolledStudentsCount": 260,
        "type": "Theory",
        "courseVariant": "23UCOPCL4713-Bachelor of Technology-23UCOPCL4713-WINTER 2026-COMP_A"
    },
    {
        "id": "crs-4713-lab",
        "courseCode": "23UCOPCP4713",
        "title": "CLOUD AND EDGE COMPUTING LAB",
        "credits": 2,
        "department": "COMPUTER ENGINEERING",
        "semester": "VII",
        "facultyName": "Prof. Marcus Vance",
        "facultyId": "FAC-09",
        "totalConductedLectures": 13,
        "enrolledStudentsCount": 260,
        "type": "Practical",
        "courseVariant": "23UCOPCP4713-Bachelor of Technology-23UCOPCP4713-WINTER 2026-COMP_A1"
    },
    {
        "id": "crs-4712",
        "courseCode": "23UCOPCL4712",
        "title": "CYBER SECURITY",
        "credits": 3,
        "department": "COMPUTER ENGINEERING",
        "semester": "VII",
        "facultyName": "Dr. Anita Roy",
        "facultyId": "FAC-03",
        "totalConductedLectures": 39,
        "enrolledStudentsCount": 260,
        "type": "Theory",
        "courseVariant": "23UCOPCL4712-Bachelor of Technology-23UCOPCL4712-WINTER 2026-COMP_A"
    },
    {
        "id": "crs-4712-lab",
        "courseCode": "23UCOPCP4712",
        "title": "CYBER SECURITY LAB",
        "credits": 2,
        "department": "COMPUTER ENGINEERING",
        "semester": "VII",
        "facultyName": "Dr. Emily Noether",
        "facultyId": "FAC-10",
        "totalConductedLectures": 13,
        "enrolledStudentsCount": 260,
        "type": "Practical",
        "courseVariant": "23UCOPCP4712-Bachelor of Technology-23UCOPCP4712-WINTER 2026-COMP_A1"
    },
    {
        "id": "crs-4705c",
        "courseCode": "23UCOPEL4705C",
        "title": "DATA MINING AND INFORMATION RETRIEVAL",
        "credits": 3,
        "department": "COMPUTER ENGINEERING",
        "semester": "VII",
        "facultyName": "Prof. Vikram Sharma",
        "facultyId": "FAC-05",
        "totalConductedLectures": 41,
        "enrolledStudentsCount": 260,
        "type": "Theory",
        "courseVariant": "23UCOPEL4705C-Bachelor of Technology-23UCOPEL4705C-WINTER 2026-COMP_A"
    },
    {
        "id": "crs-4703-proj",
        "courseCode": "23UCOELP4703",
        "title": "PROJECT",
        "credits": 6,
        "department": "COMPUTER ENGINEERING",
        "semester": "VII",
        "facultyName": "Dr. James Miller",
        "facultyId": "ADM-01",
        "totalConductedLectures": 12,
        "enrolledStudentsCount": 260,
        "type": "PROJECT",
        "courseVariant": "23UCOELP4703-Bachelor of Technology-23UCOELP4703-WINTER 2026-COMP_A"
    },
    {
        "id": "crs-4804",
        "courseCode": "23UCOELL4804",
        "title": "RESEARCH METHODOLOGY",
        "credits": 3,
        "department": "COMPUTER ENGINEERING",
        "semester": "VII",
        "facultyName": "Dr. Meera Kulkarni",
        "facultyId": "FAC-06",
        "totalConductedLectures": 40,
        "enrolledStudentsCount": 260,
        "type": "Theory",
        "courseVariant": "23UCOELL4804-Bachelor of Technology-23UCOELL4804-WINTER 2026-COMP_A"
    },
    {
        "id": "crs-4704d",
        "courseCode": "23UCOPEL4704D",
        "title": "SOCIAL NETWORK ANALYSIS",
        "credits": 3,
        "department": "COMPUTER ENGINEERING",
        "semester": "VII",
        "facultyName": "Prof. Sanjay Gupta",
        "facultyId": "FAC-07",
        "totalConductedLectures": 41,
        "enrolledStudentsCount": 260,
        "type": "Theory",
        "courseVariant": "23UCOPEL4704D-Bachelor of Technology-23UCOPEL4704D-WINTER 2026-COMP_A"
    }
]

def get_sppu_grade_details(total_marks):
    if total_marks >= 80:
        return "O", 10
    elif total_marks >= 70:
        return "A+", 9
    elif total_marks >= 60:
        return "A", 8
    elif total_marks >= 55:
        return "B+", 7
    elif total_marks >= 50:
        return "B", 6
    elif total_marks >= 45:
        return "C", 5
    elif total_marks >= 40:
        return "P", 4
    else:
        return "F", 0

print("Generating SPPU Dataset for Students & Faculty Members...")

users_list = []
students_list = []
grades_list = []
fees_list = []
attendance_list = []
faculties_list = []

# Generate Faculty User Login Accounts & Faculty Collection Records
for fac in FACULTY_PROFILES:
    role = "admin" if fac["facultyId"] == "ADM-01" else "faculty"
    pwd = "HOD@123" if role == "admin" else "Faculty@123"
    
    users_list.append({
        "id": f"usr-{fac['facultyId'].lower()}",
        "name": fac["name"],
        "shortName": fac["shortName"],
        "email": fac["email"],
        "password": pwd,
        "role": role,
        "registrationNumber": fac["facultyId"],
        "department": fac["department"],
        "semester": fac["designation"],
        "avatar": fac["avatar"],
        "phone": fac["phone"]
    })

    faculties_list.append({
        "id": fac["id"],
        "facultyId": fac["facultyId"],
        "name": fac["name"],
        "designation": fac["designation"],
        "department": fac["department"],
        "email": fac["email"],
        "phone": fac["phone"],
        "qualification": fac["qualification"],
        "specialization": fac["specialization"],
        "officeLocation": fac["officeLocation"],
        "joiningYear": fac["joiningYear"],
        "experienceYears": fac["experienceYears"],
        "avatar": fac["avatar"],
        "assignedCourses": fac["assignedCourses"]
    })

# Generate 260 Students
for i in range(1, 261):
    std_id = f"std-{i:03d}"
    usr_id = f"usr-std-{i:03d}"
    
    if i == 1:
        reg_no = "23ACOE1121163"
        roll_no = "A07"
        full_name = "ADEEN WAQQAS AHMED SHAHZAD AHMED"
        father_name = "SHAHZAD AHMED"
        mother_name = "SHABANA PARVEEN AHMED"
        short_name = "ADEEN"
        email = "adeen.waqqas@athena.edu"
        admission_category = "Institute Level"
    else:
        reg_no = f"23ACOE1121{i:03d}"
        roll_no = f"A{i:02d}" if i <= 99 else f"B{i-99:02d}"
        is_female = (i % 3 == 0)
        first_name = random.choice(FIRST_NAMES_FEMALE if is_female else FIRST_NAMES_MALE)
        last_name = random.choice(LAST_NAMES)
        father_first = random.choice(FIRST_NAMES_MALE)
        mother_first = random.choice(FIRST_NAMES_FEMALE)
        
        full_name = f"{first_name} {last_name}".upper()
        father_name = f"{father_first} {last_name}".upper()
        mother_name = f"{mother_first} {last_name}".upper()
        short_name = first_name.upper()
        email = f"{first_name.lower()}.{last_name.lower()}{i}@athena.edu"
        admission_category = "Institute Level" if i % 5 == 0 else ("CAP Round I" if i % 2 == 0 else "CAP Round II")

    section = "A" if i <= 65 else ("B" if i <= 130 else ("C" if i <= 195 else "D"))
    phone = f"+91 98{random.randint(10000000, 99999999)}"
    is_female_avatar = (i % 3 == 0)
    gender_tag = "women" if is_female_avatar else "men"
    avatar = f"https://randomuser.me/api/portraits/{gender_tag}/{i % 99}.jpg"

    parent_name = father_name
    parent_phone = f"+91 94{random.randint(10000000, 99999999)}"
    city = random.choice(CITIES)
    street = random.choice(STREETS)
    address = f"Flat {random.randint(101, 904)}, {street}, {city}"
    
    is_hosteller = (i % 2 == 0)
    hostel_room = f"Hostel H{random.randint(1,4)}-{random.randint(101,420)}" if is_hosteller else "Day Scholar (Local)"

    attendance = round(random.gauss(82.0, 11.0), 1)
    attendance = max(48.0, min(99.5, attendance))

    enrolled_courses = [
        "23UCOPEL4703B", "23UCOPEP4703B", "23UCOPCL4713", "23UCOPCP4713",
        "23UCOPCL4712", "23UCOPCP4712", "23UCOPEL4705C", "23UCOELP4703",
        "23UCOELL4804", "23UCOPEL4704D"
    ]

    student_total_credit_points = 0.0
    student_total_credits = 0

    for crs in COURSES_DATA:
        code = crs["courseCode"]
        crd = crs["credits"]

        ut1 = random.randint(11, 20)
        ut2 = random.randint(12, 20)
        internal_score = round((ut1 + ut2) / 2)
        end_sem_score = random.randint(22, 58)
        total_marks = internal_score + end_sem_score

        letter_grade, grade_point = get_sppu_grade_details(total_marks)

        student_total_credit_points += (grade_point * crd)
        student_total_credits += crd

        grades_list.append({
            "id": f"grd-{i:03d}-{code.lower()}",
            "registrationNumber": reg_no,
            "courseCode": code,
            "academicSession": "WINTER 2026",
            "ut1": ut1,
            "ut2": ut2,
            "internalScore": internal_score,
            "endSemScore": end_sem_score,
            "totalMarks": total_marks,
            "letterGrade": letter_grade,
            "gradePoints": grade_point
        })

    sgpa = round(student_total_credit_points / student_total_credits, 2)
    prev_cgpa = round(random.gauss(sgpa, 0.4), 2)
    prev_cgpa = max(4.5, min(9.9, prev_cgpa))
    cgpa = round((prev_cgpa * 6.0 + sgpa) / 7.0, 2)

    risk_score = round(max(0.0, min(100.0, (100.0 - attendance) * 1.2 + (10.0 - cgpa) * 8.0)), 1)
    risk_level = "CRITICAL" if risk_score >= 50.0 else ("IMPORTANT" if risk_score >= 30.0 else "NORMAL")

    users_list.append({
        "id": usr_id,
        "name": full_name,
        "shortName": short_name,
        "email": email,
        "password": "Student@123",
        "role": "student",
        "registrationNumber": reg_no,
        "department": "COMPUTER ENGINEERING",
        "semester": "VII",
        "avatar": avatar,
        "phone": phone
    })

    students_list.append({
        "id": std_id,
        "name": full_name,
        "fatherName": father_name,
        "motherName": mother_name,
        "registrationNumber": reg_no,
        "rollNumber": roll_no,
        "classSection": section,
        "degree": "Bachelor of Technology",
        "branch": "COMPUTER ENGINEERING",
        "semester": "VII",
        "academicSession": "WINTER 2026",
        "scheme": "COMPUTER ENGINEERING 2023-24",
        "academicBatch": "2023-2027",
        "admissionCategory": admission_category,
        "email": email,
        "phone": phone,
        "avatar": avatar,
        "cgpa": cgpa,
        "sgpa": sgpa,
        "attendancePercentage": attendance,
        "riskLevel": risk_level,
        "riskScore": risk_score,
        "parentName": parent_name,
        "parentPhone": parent_phone,
        "address": address,
        "hostelRoom": hostel_room,
        "enrolledCourses": enrolled_courses
    })

    tuition_fee = 95000.0
    dev_fee = 15000.0
    exam_fee = 3500.0
    lib_fee = 2500.0
    hostel_fee = 45000.0 if is_hosteller else 0.0

    total_receivable = tuition_fee + dev_fee + exam_fee + lib_fee + hostel_fee
    scholarship = 25000.0 if (cgpa >= 8.8 and i % 4 == 0) else 0.0
    net_payable = total_receivable - scholarship

    if i % 7 == 0:
        paid_amount = round(net_payable * 0.5, 2)
        status = "PARTIAL"
    elif i % 13 == 0:
        paid_amount = 0.0
        status = "OVERDUE"
    else:
        paid_amount = net_payable
        status = "PAID"

    pending_dues = max(0.0, round(net_payable - paid_amount, 2))

    fee_breakdown = [
        {"feeHead": "Tuition Fee", "totalAmount": tuition_fee, "paidAmount": min(tuition_fee, paid_amount), "dueAmount": max(0.0, tuition_fee - min(tuition_fee, paid_amount)), "status": "PAID" if paid_amount >= tuition_fee else "PARTIAL"},
        {"feeHead": "Development Fee", "totalAmount": dev_fee, "paidAmount": dev_fee if paid_amount >= (tuition_fee + dev_fee) else 0.0, "dueAmount": 0.0 if paid_amount >= (tuition_fee + dev_fee) else dev_fee, "status": "PAID" if paid_amount >= (tuition_fee + dev_fee) else "PENDING"},
        {"feeHead": "Examination Fee", "totalAmount": exam_fee, "paidAmount": exam_fee if paid_amount > 0 else 0.0, "dueAmount": 0.0 if paid_amount > 0 else exam_fee, "status": "PAID" if paid_amount > 0 else "PENDING"},
        {"feeHead": "Library & Lab Fee", "totalAmount": lib_fee, "paidAmount": lib_fee if paid_amount > 0 else 0.0, "dueAmount": 0.0 if paid_amount > 0 else lib_fee, "status": "PAID" if paid_amount > 0 else "PENDING"}
    ]
    if is_hosteller:
        fee_breakdown.append({
            "feeHead": "Hostel & Mess Fee", "totalAmount": hostel_fee, "paidAmount": hostel_fee if status == "PAID" else 0.0, "dueAmount": 0.0 if status == "PAID" else hostel_fee, "status": "PAID" if status == "PAID" else "PENDING"
        })

    payment_history = []
    if paid_amount > 0:
        payment_history.append({
            "transactionId": f"TXN{random.randint(10000000, 99999999)}",
            "date": f"2026-07-{random.randint(10, 28):02d}",
            "amount": paid_amount,
            "paymentMode": random.choice(["UPI_GPAY", "NET_BANKING", "CREDIT_CARD", "NEFT"]),
            "feeHead": "Tuition & Academic Fees",
            "status": "SUCCESS"
        })

    fees_list.append({
        "id": f"fee-{i:03d}",
        "registrationNumber": reg_no,
        "studentName": full_name,
        "branch": "COMPUTER ENGINEERING",
        "academicSession": "WINTER 2026",
        "totalReceivable": total_receivable,
        "scholarshipAdjustment": scholarship,
        "totalPaid": paid_amount,
        "pendingDues": pending_dues,
        "overallStatus": status,
        "feeBreakdown": fee_breakdown,
        "paymentHistory": payment_history
    })

    # Monday-to-Friday Timetable Schedule Across 4 Teaching Months (Aug 1 to Nov 30)
    # Mapping 1 Dedicated Faculty per Course Component
    course_faculty_map = {
        "23UCOPEL4703B": "FAC-01", # BLOCKCHAIN TECHNOLOGY (Theory) - Prof. Sarah Jenkins
        "23UCOPEP4703B": "FAC-08", # BLOCKCHAIN TECHNOLOGY LAB (Practical) - Dr. Arthur Pendelton
        "23UCOPCL4713": "FAC-02", # CLOUD AND EDGE COMPUTING (Theory) - Prof. Rajesh Kulkarni
        "23UCOPCP4713": "FAC-09", # CLOUD AND EDGE COMPUTING LAB (Practical) - Prof. Marcus Vance
        "23UCOPCL4712": "FAC-03", # CYBER SECURITY (Theory) - Dr. Anita Roy
        "23UCOPCP4712": "FAC-10", # CYBER SECURITY LAB (Practical) - Dr. Emily Noether
        "23UCOPEL4705C": "FAC-05", # DATA MINING AND INFORMATION RETRIEVAL (Theory) - Prof. Vikram Sharma
        "23UCOELP4703": "ADM-01", # PROJECT - Dr. James Miller (HOD)
        "23UCOELL4804": "FAC-06", # RESEARCH METHODOLOGY (Theory) - Dr. Meera Kulkarni
        "23UCOPEL4704D": "FAC-07"  # SOCIAL NETWORK ANALYSIS (Theory) - Prof. Sanjay Gupta
    }

    # Timetable Schedule per Day of Week (0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri) covering all 10 subjects
    day_timetable = {
        0: ["23UCOPEL4703B", "23UCOPCL4713", "23UCOPCL4712"],
        1: ["23UCOPEP4703B", "23UCOPCP4713", "23UCOPEL4705C"],
        2: ["23UCOPCL4712", "23UCOPCP4712", "23UCOELL4804"],
        3: ["23UCOPEL4703B", "23UCOPCL4713", "23UCOPEL4704D"],
        4: ["23UCOELP4703", "23UCOELL4804", "23UCOPEL4704D"]
    }

    start_date = datetime(2026, 8, 1) # Saturday Aug 1
    end_teaching_date = datetime(2026, 11, 30) # Monday Nov 30 (Cutoff date of 4th Month)

    # Generate attendance for each calendar working day (Mon-Fri) from Aug 1 to Nov 30
    curr = start_date
    att_counter = 1
    while curr <= end_teaching_date:
        wday = curr.weekday()
        if wday < 5: # Mon-Fri
            month_num = curr.month - 7 # Month 1 (Aug), Month 2 (Sep), Month 3 (Oct), Month 4 (Nov)
            date_str = curr.strftime("%Y-%m-%d")
            subjects_today = day_timetable[wday]

            for code in subjects_today:
                target_prob = attendance / 100.0
                is_present = (random.random() <= target_prob)
                fac_id = course_faculty_map.get(code, "FAC-01")

                attendance_list.append({
                    "id": f"att-{i:03d}-{code.lower()}-{att_counter:04d}",
                    "studentId": std_id,
                    "registrationNumber": reg_no,
                    "courseCode": code,
                    "date": date_str,
                    "dayOfWeek": curr.strftime("%A"),
                    "present": is_present,
                    "facultyId": fac_id,
                    "sessionMonth": f"Month {month_num} ({curr.strftime('%B')})"
                })
                att_counter += 1
        curr += timedelta(days=1)

# Save JSON Datasets
files_to_write = {
    "users.json": users_list,
    "students.json": students_list,
    "courses.json": COURSES_DATA,
    "grades.json": grades_list,
    "fees.json": fees_list,
    "attendance.json": attendance_list,
    "faculties.json": faculties_list
}

for filename, data in files_to_write.items():
    filepath = os.path.join(OUTPUT_DIR, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print(f"Successfully wrote {len(data)} items to {filepath}")

print("Faculty & Student Dataset generation completed successfully!")
