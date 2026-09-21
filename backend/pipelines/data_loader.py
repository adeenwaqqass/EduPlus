"""
Data Loader Pipeline (d:/EduPlus/backend/pipelines/data_loader.py)
-------------------------------------------------------------------
Unified Data Ingestion & Pipeline Interface.
Extracts dataset streams from MongoDB (database: `eduplus`) or Dataset JSON files.
"""

import json
import os
from typing import Dict, List, Any, Optional

try:
    import pymongo
    PYMONGO_AVAILABLE = True
except ImportError:
    PYMONGO_AVAILABLE = False


class DataLoaderPipeline:
    def __init__(self, mongo_uri: str = "mongodb://localhost:27017/", db_name: str = "eduplus"):
        self.mongo_uri = mongo_uri
        self.db_name = db_name
        self.client = None
        self.db = None
        self._init_connection()

    def _init_connection(self):
        if PYMONGO_AVAILABLE:
            try:
                self.client = pymongo.MongoClient(self.mongo_uri, serverSelectionTimeoutMS=2000)
                self.client.server_info() # trigger connection check
                self.db = self.client[self.db_name]
            except Exception:
                self.client = None
                self.db = None

    def get_dataset_dir(self) -> str:
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        return os.path.join(base_dir, "Dataset")

    def _load_json_fallback(self, filename: str) -> List[Dict[str, Any]]:
        file_path = os.path.join(self.get_dataset_dir(), filename)
        if os.path.exists(file_path):
            with open(file_path, "r", encoding="utf-8") as f:
                return json.load(f)
        return []

    def load_students(self) -> List[Dict[str, Any]]:
        """Stream student records from MongoDB pipeline or Dataset JSON fallback."""
        if self.db is not None:
            try:
                records = list(self.db["students"].find({}, {"_id": 0}))
                if records:
                    return records
            except Exception:
                pass
        return self._load_json_fallback("students.json")

    def load_faculties(self) -> List[Dict[str, Any]]:
        """Stream faculty records from MongoDB pipeline or Dataset JSON fallback."""
        if self.db is not None:
            try:
                records = list(self.db["faculties"].find({}, {"_id": 0}))
                if records:
                    return records
            except Exception:
                pass
        return self._load_json_fallback("faculties.json")

    def load_courses(self) -> List[Dict[str, Any]]:
        """Stream course records from MongoDB pipeline or Dataset JSON fallback."""
        if self.db is not None:
            try:
                records = list(self.db["courses"].find({}, {"_id": 0}))
                if records:
                    return records
            except Exception:
                pass
        return self._load_json_fallback("courses.json")

    def load_attendance(self) -> List[Dict[str, Any]]:
        """Stream attendance log records from MongoDB pipeline or Dataset JSON fallback."""
        if self.db is not None:
            try:
                records = list(self.db["attendance"].find({}, {"_id": 0}))
                if records:
                    return records
            except Exception:
                pass
        return self._load_json_fallback("attendance.json")

    def load_grades(self) -> List[Dict[str, Any]]:
        """Stream grade records from MongoDB pipeline or Dataset JSON fallback."""
        if self.db is not None:
            try:
                records = list(self.db["grades"].find({}, {"_id": 0}))
                if records:
                    return records
            except Exception:
                pass
        return self._load_json_fallback("grades.json")

    def load_users(self) -> List[Dict[str, Any]]:
        """Stream user authentication credentials from MongoDB pipeline or Dataset JSON fallback."""
        if self.db is not None:
            try:
                records = list(self.db["users"].find({}, {"_id": 0}))
                if records:
                    return records
            except Exception:
                pass
        return self._load_json_fallback("users.json")
