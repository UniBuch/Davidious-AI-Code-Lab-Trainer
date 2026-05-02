import type { DocumentItem, QuestionItem, LearningPathDetail, LearningPathSummary } from "../types/types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const authHeaders = (): Record<string, string> => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export async function uploadFile(file: File): Promise<{ document: DocumentItem }> {
    const form = new FormData();
    form.append("file", file);
    const r = await fetch(`${API_BASE}/documents/upload`, {
        method: "POST",
        headers: authHeaders(),
        body: form,
    });
    if (!r.ok) {
        const err = await r.json().catch(() => ({ detail: r.statusText }));
        const msg =
            r.status === 503
                ? "Service temporarily unavailable. The database may be offline—check your connection or try again later."
                : r.status === 401
                    ? "Please log in again."
                    : (err.detail || "Upload failed");
        throw new Error(msg);
    }
    return r.json();
}

export async function uploadYoutube(url: string): Promise<{ document_id: number }> {
    const form = new FormData();
    form.append("youtube_url", url);
    const r = await fetch(`${API_BASE}/documents/youtube`, {
        method: "POST",
        headers: authHeaders(),
        body: form,
    });
    if (!r.ok) {
        const err = await r.json().catch(() => ({ detail: r.statusText }));
        const msg =
            r.status === 503
                ? "Service temporarily unavailable. The database may be offline."
                : r.status === 401
                    ? "Please log in again."
                    : (err.detail || "YouTube ingest failed");
        throw new Error(msg);
    }
    return r.json();
}


export async function getDocuments(): Promise<DocumentItem[]> {
    const r = await fetch(`${API_BASE}/documents`, { headers: authHeaders() });
    if (!r.ok) {
        if (r.status === 401) throw new Error("Please log in again.");
        throw new Error("Failed to load documents");
    }
    return r.json();
}

export async function getQuestions(documentId?: number): Promise<QuestionItem[]> {
    let url = `${API_BASE}/questions`;
    if (documentId != null) url += `?document_id=${documentId}`;
    const r = await fetch(url, { headers: authHeaders() });
    if (!r.ok) {
        if (r.status === 401) throw new Error("Please log in again.");
        throw new Error("Failed to load questions");
    }
    return r.json();
}

export async function createLearningPath(data: {
    title: string;
    description?: string;
    hours_per_day: number;
}): Promise<LearningPathDetail> {
    const r = await fetch(`${API_BASE}/learning-paths`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(data),
    });
    if (!r.ok) {
        const err = await r.json().catch(() => ({ detail: r.statusText }));
        throw new Error(err.detail || "Failed to create learning path");
    }
    return r.json();
}

export async function getLearningPaths(): Promise<LearningPathSummary[]> {
    const r = await fetch(`${API_BASE}/learning-paths`, { headers: authHeaders() });
    if (!r.ok) {
        if (r.status === 401) throw new Error("Please log in again.");
        throw new Error("Failed to load learning paths");
    }
    return r.json();
}


export async function getLearningPath(id: number): Promise<LearningPathDetail> {
    const r = await fetch(`${API_BASE}/learning-paths/${id}`, { headers: authHeaders() });
    if (!r.ok) {
        if (r.status === 401) throw new Error("Please log in again.");
        if (r.status === 404) throw new Error("Learning path not found");
        throw new Error("Failed to load learning path");
    }
    return r.json();
}

export async function deleteLearningPath(id: number): Promise<void> {
    const r = await fetch(`${API_BASE}/learning-paths/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!r.ok && r.status !== 204) throw new Error("Failed to delete learning path");
}

export async function addDocumentToPath(
    pathId: number,
    file: File
): Promise<{ document_id: number }> {
    const form = new FormData();
    form.append("file", file);
    const r = await fetch(`${API_BASE}/learning-paths/${pathId}/documents`, {
        method: "POST",
        headers: authHeaders(),
        body: form,
    });
    if (!r.ok) {
        const err = await r.json().catch(() => ({ detail: r.statusText }));
        throw new Error(err.detail || `Failed to upload ${file.name}`);
    }
    return r.json();
}

export async function addYouTubeToPath(
    pathId: number,
    url: string
): Promise<{ document_id: number }> {
    const form = new FormData();
    form.append("youtube_url", url);
    const r = await fetch(`${API_BASE}/learning-paths/${pathId}/youtube`, {
        method: "POST",
        headers: authHeaders(),
        body: form,
    });
    if (!r.ok) {
        const err = await r.json().catch(() => ({ detail: r.statusText }));
        throw new Error(err.detail || `Failed to add YouTube URL`);
    }
    return r.json();
}