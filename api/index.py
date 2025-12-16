"""
Vercel Serverless Function for FastAPI Backend
"""
import sys
from pathlib import Path

# Add backend directory to Python path
backend_path = Path(__file__).parent.parent / "backend"
sys.path.insert(0, str(backend_path))

from backend.app.main import app

# Export the app for Vercel
handler = app
