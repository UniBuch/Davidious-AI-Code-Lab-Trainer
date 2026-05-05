# backend/conftest.py
import sys
import os

backend_dir = os.path.dirname(__file__)
sys.path.insert(0, backend_dir)

os.chdir(backend_dir)