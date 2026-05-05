import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


# ── App health ──────────────────────────────────────────────────────

def test_docs_endpoint():
    """Ensure the automatic docs UI is available."""
    response = client.get("/docs")
    assert response.status_code == 200
    assert "<title>FastAPI" in response.text


def test_openapi_schema():
    """The OpenAPI JSON schema should be accessible."""
    response = client.get("/openapi.json")
    assert response.status_code == 200
    data = response.json()
    assert "paths" in data
    assert "/auth/register" in data["paths"]


# ── Auth endpoints (unauthenticated) ───────────────────────────────

def test_me_unauthenticated():
    """Accessing /auth/me without a token should return 401."""
    response = client.get("/auth/me")
    assert response.status_code == 401


def test_me_with_bad_token():
    """Accessing /auth/me with a bogus token should return 401."""
    response = client.get(
        "/auth/me",
        headers={"Authorization": "Bearer totally-invalid-token"},
    )
    assert response.status_code == 401


def test_login_missing_credentials():
    """POST /auth/login with no body should return 422 (validation error)."""
    response = client.post("/auth/login")
    assert response.status_code == 422


def test_register_missing_body():
    """POST /auth/register with no JSON body should return 422."""
    response = client.post("/auth/register")
    assert response.status_code == 422


# ── Protected resource endpoints (unauthenticated) ─────────────────

def test_documents_list_unauthenticated():
    """GET /documents without auth should return 401."""
    response = client.get("/documents")
    assert response.status_code == 401


def test_learning_paths_list_unauthenticated():
    """GET /learning-paths without auth should return 401."""
    response = client.get("/learning-paths")
    assert response.status_code == 401


def test_youtube_ingest_unauthenticated():
    """POST /youtube without auth should return 401."""
    response = client.post("/youtube", data={"youtube_url": "https://youtube.com/watch?v=abc"})
    assert response.status_code == 401
