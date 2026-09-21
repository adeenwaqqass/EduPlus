"""
ETL Data Flow Pipeline (d:/EduPlus/backend/pipelines/etl_pipeline.py)
----------------------------------------------------------------------
Extract, Transform, Load (ETL) pipeline that normalizes JSON dataset entity streams 
and synchronizes clean collections into MongoDB (`eduplus` and `eduplus_cms`).
"""

import sys
import math
from typing import Dict, List, Any
from .data_loader import DataLoaderPipeline

try:
    import pymongo
    PYMONGO_AVAILABLE = True
except ImportError:
    PYMONGO_AVAILABLE = False


class ETLPipeline:
    def __init__(self, data_loader: DataLoaderPipeline = None):
        self.loader = data_loader or DataLoaderPipeline()

    def transform_student(self, student: Dict[str, Any]) -> Dict[str, Any]:
        """Transformation stage: clean and calculate balanced risk metrics."""
        transformed = dict(student)
        att = float(transformed.get("attendancePercentage", 75.0))
        cgpa = float(transformed.get("cgpa", 6.5))
        
        courses = transformed.get("enrolledCourses", [])
        if isinstance(courses, list) and len(courses) > 0 and isinstance(courses[0], dict):
            ut1 = float(courses[0].get("ut1", 14.0))
            ut2 = float(courses[0].get("ut2", 14.0))
            ia1 = float(courses[0].get("ia1", 7.0))
            ia2 = float(courses[0].get("ia2", 7.0))
        else:
            ut1, ut2, ia1, ia2 = 14.0, 14.0, 7.0, 7.0

        ut_avg = (ut1 + ut2) / 2.0
        internal_total = ut_avg + ia1 + ia2 # out of 40

        # Calculate Risk Score (0 - 100)
        risk_score = round(max(0.0, min(100.0, (100.0 - att) * 0.45 + (40.0 - internal_total) * 0.8 + (10.0 - cgpa) * 2.5)), 1)
        
        if att < 65.0 or cgpa < 5.5 or risk_score >= 50.0:
            risk_level = "CRITICAL"
        elif att < 75.0 or cgpa < 6.5 or risk_score >= 30.0:
            risk_level = "IMPORTANT"
        else:
            risk_level = "NORMAL"

        transformed["riskLevel"] = risk_level
        transformed["riskScore"] = risk_score
        transformed["detentionStatus"] = "DETAINED" if att < 75.0 else "ELIGIBLE"
        return transformed

    def run_pipeline(self) -> Dict[str, Any]:
        """Execute Full ETL Data Flow Pipeline."""
        print("Executing EduPlus ETL Data Flow Pipeline...")

        # 1. Extract
        students_raw = self.loader.load_students()
        faculties_raw = self.loader.load_faculties()
        courses_raw = self.loader.load_courses()
        attendance_raw = self.loader.load_attendance()
        users_raw = self.loader.load_users()

        print(f"Extracted: {len(students_raw)} Students, {len(faculties_raw)} Faculties, {len(courses_raw)} Courses, {len(attendance_raw)} Attendance logs.")

        # 2. Transform
        students_transformed = [self.transform_student(s) for s in students_raw]

        # 3. Load into MongoDB (eduplus & eduplus_cms)
        stats = {
            "students_processed": len(students_transformed),
            "faculties_processed": len(faculties_raw),
            "courses_processed": len(courses_raw),
            "attendance_processed": len(attendance_raw),
            "users_processed": len(users_raw),
            "mongodb_synced": False
        }

        if PYMONGO_AVAILABLE:
            try:
                client = pymongo.MongoClient("mongodb://localhost:27017/", serverSelectionTimeoutMS=2000)
                for db_name in ["eduplus", "eduplus_cms"]:
                    db = client[db_name]
                    db["students"].delete_many({})
                    db["students"].insert_many(students_transformed)

                    db["faculties"].delete_many({})
                    db["faculties"].insert_many(faculties_raw)

                    db["courses"].delete_many({})
                    db["courses"].insert_many(courses_raw)

                    db["attendance"].delete_many({})
                    if attendance_raw:
                        db["attendance"].insert_many(attendance_raw)

                    db["users"].delete_many({})
                    db["users"].insert_many(users_raw)

                stats["mongodb_synced"] = True
                print("Synchronized data pipelines to MongoDB databases (`eduplus` and `eduplus_cms`).")
            except Exception as e:
                print(f"MongoDB sync warning: {e}")

        return stats
