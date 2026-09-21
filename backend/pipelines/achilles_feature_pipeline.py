"""
Achilles Feature Engineering Pipeline (d:/EduPlus/backend/pipelines/achilles_feature_pipeline.py)
--------------------------------------------------------------------------------------------------
ML Feature Pipeline & Prescriptive Intelligence Data Flow for Achilles Engine.
"""

import math
from typing import Dict, List, Any, Tuple
from .data_loader import DataLoaderPipeline

class AchillesFeaturePipeline:
    def __init__(self, data_loader: DataLoaderPipeline = None):
        self.loader = data_loader or DataLoaderPipeline()

    def extract_dataset(self) -> List[Dict[str, Any]]:
        """Extract student records via data loader pipeline."""
        return self.loader.load_students()

    def extract_feature_matrix(self) -> Dict[str, Any]:
        """Transform student records into standardized feature matrix X and target y for Stacking Ensemble ML."""
        students = self.extract_dataset()
        X_rows = []
        y_rows = []
        rolls = []
        
        risk_map = {"NORMAL": 0, "IMPORTANT": 1, "CRITICAL": 2}

        for s in students:
            att = float(s.get("attendancePercentage", 75.0))
            cgpa = float(s.get("cgpa", 6.5))
            courses = s.get("enrolledCourses", [])
            
            if isinstance(courses, list) and len(courses) > 0 and isinstance(courses[0], dict):
                ut1 = float(courses[0].get("ut1", 14.0))
                ut2 = float(courses[0].get("ut2", 14.0))
                ia1 = float(courses[0].get("ia1", 7.0))
                ia2 = float(courses[0].get("ia2", 7.0))
            else:
                ut1, ut2, ia1, ia2 = 14.0, 14.0, 7.0, 7.0

            ut_avg = (ut1 + ut2) / 2.0
            internal_total = ut_avg + ia1 + ia2

            # Feature vector: [att, ut1, ut2, ia1, ia2, cgpa, internal_total]
            X_rows.append([att, ut1, ut2, ia1, ia2, cgpa, internal_total])
            
            risk_lvl = s.get("riskLevel", "NORMAL")
            y_rows.append(risk_map.get(risk_lvl, 0))
            rolls.append(s.get("rollNumber", "N/A"))

        return {
            "X": X_rows,
            "y": y_rows,
            "rollNumbers": rolls,
            "featureNames": ["attendancePercentage", "ut1Score", "ut2Score", "ia1Score", "ia2Score", "cgpa", "internalTotalScore"]
        }

    def compute_student_prescriptive_insights(self, student_record: Dict[str, Any]) -> Dict[str, Any]:
        """Pipeline transformer: Computes SPPU academic formulas & prescriptive advice."""
        roll = student_record.get("rollNumber", "N/A")
        name = student_record.get("name", "Student")
        att = float(student_record.get("attendancePercentage", 70.0))
        cgpa = float(student_record.get("cgpa", 6.5))
        branch = student_record.get("branch", "Computer Engineering")
        sem = student_record.get("semester", 6)
        risk = student_record.get("riskLevel", "IMPORTANT")

        courses = student_record.get("enrolledCourses", [])
        if isinstance(courses, list) and len(courses) > 0 and isinstance(courses[0], dict):
            ut1 = float(courses[0].get("ut1", 14.0))
            ut2 = float(courses[0].get("ut2", 14.0))
            ia1 = float(courses[0].get("ia1", 7.0))
            ia2 = float(courses[0].get("ia2", 7.0))
        else:
            ut1, ut2, ia1, ia2 = 14.0, 14.0, 7.0, 7.0

        ut_avg = (ut1 + ut2) / 2.0
        internal_total = ut_avg + ia1 + ia2

        required_endsem = max(0.0, 40.0 - internal_total)
        predicted_endsem = round(min(60.0, max(12.0, (internal_total / 40.0) * 45.0 + (cgpa / 10.0) * 15.0)), 1)
        predicted_total = round(min(100.0, internal_total + predicted_endsem), 1)

        T = 40  # Total lectures
        A = T * (att / 100.0)
        is_detained = att < 75.0

        if is_detained:
            lectures_needed = max(0, int(math.ceil((0.75 * T - A) / 0.25)))
            safe_missable = 0
        else:
            lectures_needed = 0
            safe_missable = max(0, int(math.floor((A - 0.75 * T) / 0.75)))

        advice_list = []
        if is_detained:
            advice_list.append(
                f"🚨 ATTENDANCE RECOVERY: Must attend next {lectures_needed} consecutive lectures without missing to elevate attendance from {att}% to >= 75.0% and lift detention status."
            )
        else:
            advice_list.append(
                f"✅ ATTENDANCE COMPLIANT: Current attendance at {att}%. Safe to miss up to {safe_missable} lectures while remaining above mandatory 75% cutoff."
            )

        advice_list.append(
            f"🎯 EXAM TARGET SCORE: Internal marks = {internal_total}/40. Minimum End-Sem Exam Score needed = {required_endsem}/60 to meet 40/100 passing criteria."
        )

        if ut_avg < 14.0:
            target_ut2 = max(0, min(20, int(math.ceil(2 * 14.0 - ut1))))
            advice_list.append(
                f"📘 ACADEMIC REMEDIATION: Aim for minimum {target_ut2}/20 in Unit Test 2 to raise internal test average to safe 14/20 target."
            )

        return {
            "roll": roll,
            "name": name,
            "att": att,
            "cgpa": cgpa,
            "branch": branch,
            "sem": sem,
            "risk": risk,
            "is_detained": is_detained,
            "internal_total": internal_total,
            "required_endsem": required_endsem,
            "predicted_endsem": predicted_endsem,
            "predicted_total": predicted_total,
            "lectures_needed": lectures_needed,
            "safe_missable": safe_missable,
            "advices": advice_list,
            "courses": courses
        }
