import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLearningPaths, deleteLearningPath } from "../api/api";
import type { LearningPathSummary } from "../types/types";
import { sharedStyles } from "../styles/shared";

function StatusBadge({ status }: { status: string }) {
    const map: Record<string, { label: string; cls: string }> = {
        processing: { label: "Processing…", cls: sharedStyles.badgeProcessing },
        ready: { label: "Ready", cls: sharedStyles.badgeReady },
        error: { label: "Error", cls: sharedStyles.badgeError },
    };
    const { label, cls } = map[status] ?? { label: status, cls: "" };
    return <span className={`${sharedStyles.statusBadge} ${cls}`}>{label}</span>;
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export default function PathsListPage() {
    const [paths, setPaths] = useState<LearningPathSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState<number | null>(null);

    async function load() {
        try {
            const data = await getLearningPaths();
            setPaths(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, []);

    async function handleDelete(id: number, title: string) {
        if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
        setDeleting(id);
        try {
            await deleteLearningPath(id);
            setPaths((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            alert((err as Error).message);
        } finally {
            setDeleting(null);
        }
    }

    return (
        <div className={sharedStyles.page}>
            <div className={sharedStyles.pageHeader}>
                <h1 className={sharedStyles.pageTitle}>My Learning Paths</h1>
                <Link to="/paths/new" className={`${sharedStyles.btnPrimary} ${sharedStyles.btnSm}`}>+ New path</Link>
            </div>
            <p className={sharedStyles.muted}>Each path has a personalised day-by-day roadmap generated for you.</p>

            {loading && <p className={sharedStyles.muted}>Loading…</p>}
            {error && <div className={`${sharedStyles.message} ${sharedStyles.messageErr}`}>{error}</div>}

            {!loading && paths.length === 0 && (
                <div className={sharedStyles.emptyState}>
                    <div className={sharedStyles.emptyIcon}>🗺️</div>
                    <p>No learning paths yet.</p>
                    <Link to="/paths/new" className={sharedStyles.btnPrimary}>Create your first path</Link>
                </div>
            )}

            <ul className={sharedStyles.pathList}>
                {paths.map((p) => (
                    <li key={p.id} className={sharedStyles.pathCard}>
                        <div className={sharedStyles.pathCardMain}>
                            <div className={sharedStyles.pathCardTop}>
                                <Link to={`/paths/${p.id}`} className={sharedStyles.pathCardTitle}>{p.title}</Link>
                                <StatusBadge status={p.status} />
                            </div>
                            {p.description && (
                                <p className={sharedStyles.pathDescription}>{p.description}</p>
                            )}
                            <div className={sharedStyles.pathMeta}>
                                <span>⏱ {p.hours_per_day} hr/day</span>
                                {p.total_days != null && p.total_days > 0 && (
                                    <span>📅 {p.total_days} days</span>
                                )}
                                <span>📄 {p.document_count} source{p.document_count !== 1 ? "s" : ""}</span>
                                <span className={sharedStyles.docDate}>Created {formatDate(p.created_at)}</span>
                            </div>
                        </div>
                        <div className={sharedStyles.pathCardActions}>
                            <Link to={`/paths/${p.id}`} className={sharedStyles.btnSm}>View roadmap →</Link>
                            <button
                                type="button"
                                className={sharedStyles.btnDanger}
                                onClick={() => handleDelete(p.id, p.title)}
                                disabled={deleting === p.id}
                            >
                                {deleting === p.id ? "Deleting…" : "Delete"}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
