"""
EduPlus Data Pipeline Orchestration Runner (d:/EduPlus/backend/pipelines/pipeline_runner.py)
-----------------------------------------------------------------------------------------
Executes ETL Data Flow, verifies MongoDB database synchronization, and extracts 
Achilles ML feature matrices and student case study prescriptions.
"""

import sys
import os

# Set standard output encoding for Windows compatibility
sys.stdout.reconfigure(encoding='utf-8')

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from pipelines.data_loader import DataLoaderPipeline
from pipelines.etl_pipeline import ETLPipeline
from pipelines.achilles_feature_pipeline import AchillesFeaturePipeline


def run_all_pipelines():
    print("================================================================================")
    print("[EDUPLUS BACKEND DATA FLOW PIPELINES ORCHESTRATOR]")
    print("================================================================ happiest \n")

    # 1. Initialize Pipeline Loader
    loader = DataLoaderPipeline()
    print("1. Data Loader Pipeline Initialized.")

    # 2. Run ETL Pipeline
    etl = ETLPipeline(data_loader=loader)
    etl_stats = etl.run_pipeline()
    print(f"2. ETL Pipeline Output: {etl_stats}\n")

    # 3. Run Achilles Feature Pipeline
    feature_pipeline = AchillesFeaturePipeline(data_loader=loader)
    matrix_info = feature_pipeline.extract_feature_matrix()
    print("3. Achilles Feature Matrix Pipeline Extracted:")
    print(f"   - Samples: {len(matrix_info['X'])}")
    print(f"   - Features ({len(matrix_info['featureNames'])}): {matrix_info['featureNames']}\n")

    # 4. Stream Sample Prescriptions for Different Student Risk Cases
    students = loader.load_students()
    
    crit_students = [s for s in students if s.get('attendancePercentage', 100) < 75 or s.get('riskLevel') == 'CRITICAL']
    imp_students = [s for s in students if 75 <= s.get('attendancePercentage', 0) <= 82 or s.get('riskLevel') == 'IMPORTANT']
    norm_students = [s for s in students if s.get('attendancePercentage', 0) > 92 or s.get('riskLevel') == 'NORMAL']

    print("4. Streaming Achilles Prescriptive Insights Pipeline (Case Studies):")
    for case_label, sample in [("CRITICAL CASE", crit_students[0] if crit_students else students[0]),
                               ("IMPORTANT CASE", imp_students[0] if imp_students else students[1]),
                               ("NORMAL CASE", norm_students[0] if norm_students else students[2])]:
        insights = feature_pipeline.compute_student_prescriptive_insights(sample)
        print(f"\n   [{case_label}] {insights['name']} (Roll: {insights['roll']})")
        print(f"   Risk: {insights['risk']} | Attendance: {insights['att']}% | CGPA: {insights['cgpa']}")
        for adv in insights['advices']:
            print(f"     - {adv}")

    print("\n================================================================================")
    print("SUCCESS: All EduPlus Backend Data Flow Pipelines Executed Successfully.")
    print("================================================================================")


if __name__ == "__main__":
    run_all_pipelines()
