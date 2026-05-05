import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_docs_endpoint():
    """Ensure the automatic docs UI is available."""
    response = client.get("/docs")
    assert response.status_code == 200
    assert "<title>FastAPI" in response.text

def test_me_unauthenticated():
    """Accessing /auth/me without a token should return 401."""
    response = client.get("/auth/me")
    assert response.status_code == 401
